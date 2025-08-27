import { Navigate } from "react-router";
import { useAuthStore } from "./authStore";

const RequireNotAuth = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  if (user) return <Navigate to="/" replace />;
  else return children;
};
export default RequireNotAuth;
