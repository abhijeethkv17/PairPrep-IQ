import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  // use stable primitives, not the whole `session` object — react-query
  // returns a new object reference every 5s poll even when nothing changed,
  // which was causing this effect to leave + rejoin the call repeatedly
  const callId = session?.callId;
  const sessionStatus = session?.status;

  useEffect(() => {
    if (!callId) return;
    if (!isHost && !isParticipant) return;
    if (sessionStatus === "completed") return;

    let cancelled = false;
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        const client = await initializeStreamClient(
          { id: userId, name: userName, image: userImage },
          token,
        );
        if (cancelled) return;

        videoCall = client.call("default", callId);
        await videoCall.join({ create: true });

        if (cancelled) {
          // effect was torn down mid-join — leave right away instead of
          // leaving an orphaned call session behind
          await videoCall.leave().catch(() => {});
          return;
        }

        setStreamClient(client);
        setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);
        await chatClientInstance.connectUser(
          { id: userId, name: userName, image: userImage },
          token,
        );
        if (cancelled) {
          await chatClientInstance.disconnectUser().catch(() => {});
          return;
        }
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", callId);
        await chatChannel.watch();
        if (!cancelled) setChannel(chatChannel);
      } catch (error) {
        if (!cancelled) toast.error("Failed to join video call");
        console.error("Error init call", error);
      } finally {
        if (!cancelled) setIsInitializingCall(false);
      }
    };

    initCall();

    // best-effort cleanup for tab close / hard navigation, which never
    // triggers the React cleanup function below
    const handlePageHide = () => {
      if (videoCall) videoCall.leave().catch(() => {});
      if (chatClientInstance)
        chatClientInstance.disconnectUser().catch(() => {});
    };
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      cancelled = true;
      window.removeEventListener("pagehide", handlePageHide);
      setStreamClient(null);
      setCall(null);
      setChatClient(null);
      setChannel(null);
      setIsInitializingCall(true);

      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };
  }, [callId, sessionStatus, loadingSession, isHost, isParticipant]);

  return { streamClient, call, chatClient, channel, isInitializingCall };
}

export default useStreamClient;
