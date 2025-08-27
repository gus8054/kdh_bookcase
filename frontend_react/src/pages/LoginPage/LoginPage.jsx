import { Box, Paper } from "@mui/material";
import LoginTab from "./components/LoginTab/LoginTab";
import LoginContent from "./LoginContent/LoginContent";
import { useState } from "react";
import SignUpContent from "./SignUpContent/SignUpContent";

const LoginPage = () => {
  const [value, setValue] = useState(0);
  const changeTab = () => setValue((pre) => (pre == 0 ? 1 : 0));

  const content =
    value === 0 ? (
      <LoginContent changeTab={changeTab} />
    ) : (
      <SignUpContent changeTab={changeTab} />
    );

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
        <LoginTab value={value} setValue={setValue} />
        {content}
      </Paper>
    </Box>
  );
};
export default LoginPage;
