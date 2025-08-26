import { Navigate } from "react-router";
import { useAuthStore } from "./authStore";

const RequireNotAuth = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <>{children}</>;
  else return <Navigate to="/" replace />;
};
export default RequireNotAuth;
