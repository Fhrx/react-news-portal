import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* BRAND */}
        <h1
          onClick={() => navigate("/admin")}
          className="font-bold text-lg cursor-pointer"
        >
          Admin Panel
        </h1>

        {/* MENU */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "font-semibold" : "text-gray-600"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/news"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "text-gray-600"
            }
          >
            Kelola Berita
          </NavLink>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-red-500 text-sm hover:underline"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}