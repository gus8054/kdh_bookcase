import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme.js";
import { RouterProvider } from "react-router";
import router from "./router.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
);
