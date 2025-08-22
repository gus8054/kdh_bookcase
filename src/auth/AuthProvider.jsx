import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { reissueToken } from "./authService";
import { jwtDecode } from "jwt-decode";
import { Box, CircularProgress } from "@mui/material";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    reissueToken()
      .then((token) => {
        const user = jwtDecode(token);
        setUser(user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);
  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          inset: 0,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <CircularProgress />
      </Box>
    );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
