import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Leads",
      path: "/leads",
    },
    {
      name: "Events",
      path: "/events",
    },
    {
      name: "Template",
      path: "/template",
    },
    // {
    //   name: "Categories",
    //   path: "/categories",
    // },
    // {
    //   name: "Tasks",
    //   path: "/tasks",
    // },
    // {
    //   name: "Task Reminders",
    //   path: "/taskreminders",
    // },
    {
      name: "Staffs",
      path: "/staffs",
    },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0
        w-64 h-screen
        text-white
        border-r border-purple-300/10
        shadow-lg shadow-purple-950/20
      "
      style={{
        fontFamily: '"Nunito Sans", "Inter", sans-serif',
        background:
          "linear-gradient(180deg, #24132f 0%, #1f1229 100%)",
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-extrabold text-[#fff9ef]">
          Leela
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-3 mt-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname
            .toLowerCase()
            .includes(item.path.toLowerCase());

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                px-4 py-3
                rounded-xl
                text-[15px] font-semibold
                cursor-pointer
                transition
                ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-[#c8b8d6] hover:text-[#fff9ef] hover:bg-purple-300/10"
                }
              `}
            >
              {item.name}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="
          absolute bottom-6 left-3 right-3
          px-4 py-3
          rounded-xl
          text-left
          text-[15px] font-semibold
          text-[#c8b8d6]
          hover:text-[#fff9ef]
          hover:bg-red-400/10
          transition
        "
      >
        Log Out
      </button>
    </aside>
  );
}