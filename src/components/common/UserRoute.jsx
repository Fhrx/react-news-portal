import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserRoute({ children }) {
  const { user, isAuthenticated } = useAuth();

  console.log("UserRoute - isAuthenticated:", isAuthenticated());
  console.log("UserRoute - user:", user);

  if (!isAuthenticated()) {
    console.log("UserRoute - Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
}