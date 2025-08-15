import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Home from "./HomePage/HomePage.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import LoginPage from "./LoginPage/LoginPage.jsx";
import { lightTheme } from "./theme.js";
import HomePage from "./HomePage/HomePage.jsx";
import { RouterProvider } from "react-router";
import router from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
