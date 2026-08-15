import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import CreateProblemPage from "./pages/admin/CreateProblemPage";
import EditProblemPage from "./pages/admin/EditProblemPage";
import { useCurrentUser } from "./hooks/useCurrentUser";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  // only fetch once Clerk confirms the user is signed in
  const { isLoading: isUserSyncing, isError: userSyncFailed } = useCurrentUser({
    enabled: isSignedIn,
  });

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  // the DB user record can take a moment to appear right after sign-up
  // (see useCurrentUser's retry logic) — show a loader instead of letting
  // every protected page 404 in the meantime
  if (isSignedIn && isUserSyncing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg" />
          <p className="mt-4 text-base-content/70">Setting up your account…</p>
        </div>
      </div>
    );
  }

  if (isSignedIn && userSyncFailed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-error">
          We couldn't set up your account. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin/problems/new"
          element={
            isSignedIn ? (
              <ProtectedAdminRoute>
                <CreateProblemPage />
              </ProtectedAdminRoute>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/problems/:id/edit"
          element={
            isSignedIn ? (
              <ProtectedAdminRoute>
                <EditProblemPage />
              </ProtectedAdminRoute>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
