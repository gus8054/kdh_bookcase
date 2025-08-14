import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUpContent() {
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
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel htmlFor="nickname">닉네임</InputLabel>
          <OutlinedInput
            id="nickname"
            placeholder="닉네임 입력"
            label="nickname"
            fullWidth={true}
            margin="normal"
            type="text"
          />
        </FormControl>
        <Button variant="outlined" sx={{ flexShrink: 0 }}>
          중복확인
        </Button>
      </Box>
      <FormControl sx={{ width: "100%", mt: "1rem" }}>
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
        <InputLabel htmlFor="password">비밀번호</InputLabel>
        <OutlinedInput
          id="password"
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
        />
      </FormControl>
      <FormControl sx={{ width: "100%", mt: "1rem" }} variant="outlined">
        <InputLabel htmlFor="password_confirm">비밀번호 확인</InputLabel>
        <OutlinedInput
          id="password_confirm"
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
          label="PasswordConfirm"
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ marginTop: "1rem", width: "100%", textAlign: "center" }}>
        회원가입
      </Button>

      <Box sx={{ textAlign: "center", my: "1rem" }}>
        <Typography
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            display: "inline",
          })}
          gutterBottom>
          이미 계정이 있나요?
        </Typography>
        <Typography
          sx={{
            display: "inline",
            fontWeight: "bold",
            marginLeft: "1rem",
          }}
          gutterBottom>
          로그인
        </Typography>
      </Box>
    </>
  );
}
