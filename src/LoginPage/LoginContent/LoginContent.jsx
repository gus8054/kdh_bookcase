import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="email">이메일</InputLabel>
        <OutlinedInput
          id="email"
          placeholder="이메일 주소 입력"
          label="email"
          fullWidth={true}
          margin="normal"
          type="email"
        />
      </FormControl>
      <FormControl sx={{ width: "100%", mt: "1rem" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          placeholder="비밀번호 입력"
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="자동 로그인"
        sx={{ my: "1rem" }}
      />
      <Button sx={{ display: "block", width: "100%" }} variant="contained">
        로그인
      </Button>
      <Typography
        gutterBottom
        sx={{
          display: "block",
          my: "1rem",
          textAlign: "center",
          fontWeight: "bold",
        }}>
        비밀번호 재설정
      </Typography>
      <Box sx={{ textAlign: "center", my: "1rem" }}>
        <Typography
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            display: "inline",
          })}
          gutterBottom>
          계정이 없으신가요?
        </Typography>
        <Typography
          sx={{
            display: "inline",
            fontWeight: "bold",
            marginLeft: "1rem",
          }}
          gutterBottom>
          회원가입
        </Typography>
      </Box>
      <Divider
        sx={(theme) => ({
          my: "1rem",
          fontSize: "0.875rem",
          color: theme.palette.text.secondary,
        })}>
        또는
      </Divider>

      <Button
        variant="outlined"
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          width: "100%",
          borderColor: "currentcolor",
        })}>
        Log in with Google
      </Button>
      <Button
        variant="outlined"
        sx={(theme) => ({
          color: theme.palette.background.default,
          backgroundColor: theme.palette.text.primary,
          width: "100%",
          mt: "1rem",
          borderColor: "currentcolor",
        })}>
        Log in with Github
      </Button>
    </>
  );
}
