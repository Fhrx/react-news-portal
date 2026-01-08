import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (selectedRole) => {
    login(selectedRole);

    if (selectedRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/news");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          Login
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Pilih role untuk masuk ke portal berita
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin("admin")}
            className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login sebagai Admin
          </button>

          <button
            onClick={() => handleLogin("user")}
            className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Login sebagai User
          </button>

          <button
            onClick={() => handleLogin("guest")}
            className="w-full py-2 rounded border border-gray-300 hover:bg-gray-50 transition"
          >
            Masuk sebagai Guest
          </button>
        </div>
      </div>
    </div>
  );
}