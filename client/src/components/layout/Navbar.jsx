import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust import path if needed
import { Calendar, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    // If not on home page, navigate to home page with hash
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Smooth scroll directly if already on Home page
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Calendar className="w-6 h-6" />
          <span>EventHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
          <Link to="/events" className="hover:text-blue-600 transition">
            Events
          </Link>
          <button
            onClick={() => handleNavClick("features")}
            className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="hover:text-blue-600 transition bg-transparent border-none cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Auth State / Profile Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/my-events"}
                className="text-sm font-semibold text-gray-800 hover:text-blue-600"
              >
                Hi, {user.name}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 px-3 py-1.5"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}