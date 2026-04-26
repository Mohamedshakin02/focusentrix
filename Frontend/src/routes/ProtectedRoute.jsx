import NotFound from "../pages/NotFound";

// Protects routes by allowing access only if user is authenticated 
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <NotFound />;
};

export default ProtectedRoute;