import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../../auth/authService";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginContent({ changeTab }) {
  const defaultValues = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const { state } = useLocation();
  const fromPathname = state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onsubmit = async ({ email, password, autoLogin }) => {
    try {
      await login(email, password, autoLogin);
      navigate(fromPathname);
    } catch (err) {
      alert(err.serverMessage);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor="email">이메일</InputLabel>
        <OutlinedInput
          id="email"
          placeholder="이메일 주소 입력"
          label="email"
          fullWidth={true}
          margin="normal"
          type="email"
          {...register("email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        />
        <FormHelperText error>{errors.email?.message}</FormHelperText>
      </FormControl>
      <FormControl sx={{ width: "100%", mt: "1rem" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "영문과 숫자를 포함해야 합니다.",
            },
          })}
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
        <FormHelperText error>{errors.password?.message}</FormHelperText>
      </FormControl>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="자동 로그인"
        sx={{ my: "1rem" }}
        {...register("autoLogin")}
      />
      <Button
        sx={{ display: "block", width: "100%" }}
        variant="contained"
        type="submit">
        로그인
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: "1rem",
        }}>
        <Typography
          sx={(theme) => ({
            color: theme.palette.text.secondary,
          })}>
          계정이 없으신가요?
        </Typography>
        <Button
          onClick={changeTab}
          variant="text"
          sx={{
            fontWeight: "bold",
          }}>
          회원가입
        </Button>
      </Box>
      <Divider
        sx={(theme) => ({
          my: "1rem",
          fontSize: "0.875rem",
          color: theme.palette.text.secondary,
        })}>
        또는
      </Divider>
      <Link
        to="http://localhost:3000/auth/github"
        reloadDocument
        style={{ display: "block" }}>
        <Button
          variant="outlined"
          sx={(theme) => ({
            color: theme.palette.background.default,
            backgroundColor: theme.palette.text.primary,
            width: "100%",
            borderColor: "currentcolor",
          })}>
          깃헙으로 로그인하기
        </Button>
      </Link>
    </Box>
  );
}
