import { Alert, Box, Paper } from "@mui/material";

export const NotFound = () => {
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
          404 Page Not Found
        </Alert>
      </Paper>
    </Box>
  );
};
