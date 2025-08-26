import { Alert, Box, Paper } from "@mui/material";
import { useRouteError } from "react-router";

export const ErrorPage = ({ content }) => {
  const error = useRouteError();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: "2rem",
      }}>
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          mx: "2rem",
          p: "1rem",
        }}>
        <Alert variant="outlined" severity="error">
          에러 : {content || error.message}
        </Alert>
      </Paper>
    </Box>
  );
};
