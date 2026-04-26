import { Navigate } from "react-router-dom";

// Prevents authenticated users from accessing public pages and redirects them to the dashboard
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;