// components/navbar/AdminNavbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaNewspaper, 
  FaSignOutAlt, 
  FaUserCog, 
  FaTachometerAlt,
  FaPlusCircle,
  FaListAlt,
  FaBars,
  FaTimes,
  FaUser
} from "react-icons/fa";
import { useState } from "react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { 
      to: "/admin", 
      label: "Dashboard", 
      icon: <FaTachometerAlt className="w-4 h-4" />,
      end: true
    },
    { 
      to: "/admin/news", 
      label: "Kelola Berita", 
      icon: <FaListAlt className="w-4 h-4" /> 
    },
    { 
      to: "/admin/news/create", 
      label: "Buat Berita Baru", 
      icon: <FaPlusCircle className="w-4 h-4" /> 
    },
    { 
      to: "/news", 
      label: "Lihat Berita", 
      icon: <FaNewspaper className="w-4 h-4" /> 
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div 
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <FaUserCog className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-xs text-blue-200">News Management System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-white/20 backdrop-blur-sm text-white font-semibold" 
                      : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white/30 to-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaUser className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">{user?.name || "Administrator"}</p>
                <p className="text-xs text-blue-200 uppercase">Admin</p>
              </div>
            </div>

            <div className="h-6 w-px bg-white/30"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-white/20 backdrop-blur-sm text-white font-semibold" 
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
              
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FaUser className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user?.name || "Administrator"}</p>
                    <p className="text-sm text-blue-200 uppercase">Admin</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}