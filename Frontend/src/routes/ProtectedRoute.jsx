import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <NotFound />;
};

export default ProtectedRoute;