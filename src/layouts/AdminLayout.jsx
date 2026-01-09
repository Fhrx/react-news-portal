// layouts/AdminLayout.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const { isAdmin } = useAuth();

  // Pastikan hanya admin yang bisa akses
  if (!isAdmin()) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}