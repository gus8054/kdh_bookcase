import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme.js";
import { RouterProvider } from "react-router";
import router from "./router.jsx";
import RestoreAuth from "./components/RestoreAuth/RestoreAuth.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <RestoreAuth>
      <CssBaseline />
      <RouterProvider router={router} />
    </RestoreAuth>
  </ThemeProvider>
);
