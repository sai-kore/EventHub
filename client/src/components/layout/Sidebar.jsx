import { Home, CalendarDays, PlusCircle, UserCircle, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const links = [
  { name: "Dashboard", path: "/admin", icon: Home },
  { name: "Manage Events", path: "/admin/events", icon: CalendarDays },
  { name: "Create Event", path: "/admin/events/create", icon: PlusCircle },
  { name: "Profile", path: "/profile", icon: UserCircle },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen sticky top-0 shadow-lg shrink-0">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-extrabold text-blue-400">EventHub Admin</h2>
      </div>

      <nav className="flex-1 space-y-1.5 p-4">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white px-4 py-2.5 text-sm font-semibold transition cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;