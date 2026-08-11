import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";

function CreateSessionModal({
  isOpen,
  onClose,
  problems,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.problemId}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p._id === e.target.value,
                );
                setRoomConfig({
                  problemId: e.target.value,
                  difficulty: selectedProblem.difficulty.toLowerCase(),
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>
              {problems.map((problem) => (
                <option key={problem._id} value={problem._id}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {roomConfig.problemId && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">
                    {
                      problems.find((p) => p._id === roomConfig.problemId)
                        ?.title
                    }
                  </span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problemId}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;
