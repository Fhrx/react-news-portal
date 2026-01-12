import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminNavbar from "./AdminNavbar";
import UserNavbar from "./UserNavbar";

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  // Halaman yang TIDAK perlu navbar
  const noNavbarPaths = ["/", "/login"];
  
  // Jika di halaman yang tidak perlu navbar, return null
  if (noNavbarPaths.includes(location.pathname)) {
    return null;
  }

  // Jika belum login (tapi bukan di halaman excluded), tampilkan null atau bisa redirect
  if (!isAuthenticated()) {
    return null;
  }

  // Jika user adalah admin, tampilkan admin navbar
  if (user?.role === "admin") {
    return <AdminNavbar />;
  }

  // Untuk user dan guest yang sudah login
  return <UserNavbar />;
}