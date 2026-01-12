import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();

  console.log("AdminRoute - isAdmin:", isAdmin());
  console.log("AdminRoute - user:", user);

  if (!user) {
    console.log("AdminRoute - No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    console.log(`AdminRoute - User is ${user?.role}, redirecting to news`);
    return <Navigate to="/news" replace />;
  }

  return children;
}