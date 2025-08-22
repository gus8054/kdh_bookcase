import { Navigate } from "react-router";
import useAuth from "./useAuth";

const RequireNotAuth = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <>{children}</>;
  else return <Navigate to="/" replace />;
};
export default RequireNotAuth;
