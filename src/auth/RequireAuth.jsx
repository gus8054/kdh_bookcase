import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "./authStore";

const RequireAuth = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};
export default RequireAuth;
