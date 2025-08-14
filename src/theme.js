// theme.js
import { createTheme } from "@mui/material/styles";

const commonFont = [
  "Pretendard",
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
].join(",");

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4B7BEC",
      dark: "#3867D6",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFC312",
      dark: "#E1B000",
      contrastText: "#2F3542",
    },
    background: {
      default: "#F5F6FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2F3542",
      secondary: "#57606F",
    },
    success: {
      main: "#2ED573",
    },
    error: {
      main: "#FF4757",
    },
  },
  typography: {
    fontFamily: commonFont,
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 600, fontSize: "1.5rem" },
    body1: { fontWeight: 400, fontSize: "1rem" },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#4B7BEC",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: "dark",
    background: {
      default: "#1E272E",
      paper: "#2F3542",
    },
    text: {
      primary: "#F1F2F6",
      secondary: "#A4B0BE",
    },
  },
});
