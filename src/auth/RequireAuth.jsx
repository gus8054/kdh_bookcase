import { Navigate } from "react-router";
import useAuth from "./useAuth";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  if (user) return <>{children}</>;
  else return <Navigate to="/login" replace />;
};
export default RequireAuth;
