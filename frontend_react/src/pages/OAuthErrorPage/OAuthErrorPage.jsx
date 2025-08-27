import { Alert, Box, Paper, Typography } from "@mui/material";
import { useSearchParams } from "react-router";

export const OAuthErrorPage = () => {
  const [params, _] = useSearchParams();

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
          에러 : {params.get("message")}
        </Alert>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ textAlign: "center", mt: "1rem" }}>
          잠시 후 다시 시도해주십시오.
        </Typography>
      </Paper>
    </Box>
  );
};
