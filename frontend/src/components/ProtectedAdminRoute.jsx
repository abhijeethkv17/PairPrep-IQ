import { Navigate } from "react-router";
import { useCurrentUser } from "../hooks/useCurrentUser";

function ProtectedAdminRoute({ children }) {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) return null;
  if (data?.user?.role !== "admin") return <Navigate to="/dashboard" />;

  return children;
}

export default ProtectedAdminRoute;
