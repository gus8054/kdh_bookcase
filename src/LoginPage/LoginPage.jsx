import { Box, Container, Paper } from "@mui/material";
import Header from "./components/Header/Header";
import LoginTab from "./components/LoginTab/LoginTab";
import LoginContet from "./LoginContent/LoginContent";
import { useState } from "react";
import SignUpContent from "./SignUpContent/SignUpContent";

const LoginPage = () => {
  const [value, setValue] = useState(0);

  const content = value === 0 ? <LoginContet /> : <SignUpContent />;
  return (
    <>
      <Header />
      <Container maxWidth="sm">
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
            <LoginTab value={value} setValue={setValue} />
            <Box component="form">{content}</Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
export default LoginPage;
