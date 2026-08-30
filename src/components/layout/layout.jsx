import Sidebar from "../../components/SideNavbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#1f1229]">
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}