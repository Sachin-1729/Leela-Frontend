import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/leads" replace />;
  }

  return <Outlet />;
}