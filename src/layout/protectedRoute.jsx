import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import Sidebar from "../components/SideNavbar";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1f1229]">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}