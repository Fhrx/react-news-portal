// src/components/common/UserRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserRoute({ children }) {
  const { user, isAuthenticated } = useAuth();

  // Debug log (bisa dihapus nanti)
  console.log("UserRoute - isAuthenticated:", isAuthenticated());
  console.log("UserRoute - user:", user);

  // Jika belum login, redirect ke login page
  if (!isAuthenticated()) {
    console.log("UserRoute - Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan children
  return children;
}