import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { reissueToken } from "../../auth/authService";
import { useAuthStore } from "../../auth/authStore";

export default function RestoreAuth({ children }) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        await reissueToken();
      } catch (err) {
        useAuthStore.getState().setUser(null);
        useAuthStore.getState().setAccessToken(null);
        console.error(err.serverMessage);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (isLoading) return <Loading />;
  return <>{children}</>;
}
