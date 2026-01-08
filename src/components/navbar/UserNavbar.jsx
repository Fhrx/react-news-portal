import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserNavbar() {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-lg cursor-pointer"
        >
          React News
        </h1>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "text-gray-600"
            }
          >
            Berita
          </NavLink>

          <span className="text-xs px-2 py-1 bg-gray-100 rounded">
            {role}
          </span>

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