// src/components/common/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();

  // Debug log (bisa dihapus nanti)
  console.log("AdminRoute - isAdmin:", isAdmin());
  console.log("AdminRoute - user:", user);

  // Jika belum login, redirect ke login
  if (!user) {
    console.log("AdminRoute - No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Jika bukan admin, redirect ke news page
  if (!isAdmin()) {
    console.log(`AdminRoute - User is ${user?.role}, redirecting to news`);
    return <Navigate to="/news" replace />;
  }

  // Jika adalah admin, tampilkan children
  return children;
}