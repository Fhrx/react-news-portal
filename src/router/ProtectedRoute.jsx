// components/common/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  // Jika belum login, redirect ke login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Jika user ada tapi rolenya tidak diizinkan
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    // Admin coba akses user page? Boleh
    if (user.role === 'admin') {
      return children;
    }
    
    // Redirect berdasarkan role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'user':
      case 'guest':
        return <Navigate to="/news" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Jika semua kondisi terpenuhi, render children
  return children;
}