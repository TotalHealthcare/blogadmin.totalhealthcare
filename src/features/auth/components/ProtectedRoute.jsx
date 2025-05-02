import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  const isAuthenticated = authToken || localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
