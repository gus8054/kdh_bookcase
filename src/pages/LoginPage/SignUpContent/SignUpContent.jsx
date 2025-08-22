import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { checkNickname, signUp } from "../../../auth/authService";
import { useNavigate } from "react-router";

export default function SignUpContent({ changeTab }) {
  const defaultValues = {
    nickname: "",
    email: "",
    password: "",
    passwordCheck: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    setError,
    clearErrors,
    control,
  } = useForm({ defaultValues });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onsubmit = async ({ nickname, email, password }) => {
    if (!nicknameChecked) {
      setError("nickname", {
        type: "manual",
        message: "중복확인을 해주세요.",
      });
      return;
    }
    try {
      await signUp(nickname, email, password);
      navigate("/");
    } catch (err) {
      alert(err.serverMessage);
    }
  };

  const handleNicknameCheck = async (e) => {
    e.preventDefault();
    const validation = await trigger("nickname");
    if (validation) {
      const nickname = getValues("nickname");
      try {
        await checkNickname(nickname);
        clearErrors("nickname");
        setNicknameChecked(true);
        alert("사용 가능한 닉네임입니다.");
      } catch (err) {
        setError("nickname", {
          type: "server",
          message: err.serverMessage,
        });
        setNicknameChecked(false);
      }
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}>
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: "닉네임은 필수입니다.",
            maxLength: {
              value: 10,
              message: "최대 10자입니다.",
            },
          }}
          render={({ field }) => (
            <FormControl sx={{ flex: 1 }}>
              <InputLabel htmlFor="nickname">닉네임</InputLabel>
              <OutlinedInput
                id="nickname"
                placeholder="닉네임 입력"
                label="nickname"
                fullWidth={true}
                margin="normal"
                {...field}
                type="text"
                onChange={(e) => {
                  field.onChange(e);
                  setNicknameChecked(false);
                }}
              />
              <FormHelperText
                sx={{ flexBasis: "100%" }}
                error={errors.nickname}>
                {errors.nickname?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button variant="outlined" onClick={handleNicknameCheck}>
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
          {...register("email", {
            required: "이메일은 필수입니다.",
            maxLength: {
              value: 50,
              message: "최대 50자입니다.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
        />
        <FormHelperText error>{errors.email?.message}</FormHelperText>
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
          {...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
            maxLength: {
              value: 50,
              message: "최대 50자입니다.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
              message: "영문과 숫자를 포함해야 합니다.",
            },
          })}
        />
        <FormHelperText error>{errors.password?.message}</FormHelperText>
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
          {...register("passwordCheck", {
            required: "비밀번호 확인은 필수입니다.",
            validate: (value, formValues) => {
              if (value === formValues.password) return true;
              return "비밀번호가 다릅니다.";
            },
          })}
        />
        <FormHelperText error>{errors.passwordCheck?.message}</FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        sx={{ marginTop: "1rem", width: "100%", textAlign: "center" }}>
        회원가입
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
          이미 계정이 있나요?
        </Typography>
        <Button
          onClick={changeTab}
          variant="text"
          sx={{
            fontWeight: "bold",
          }}>
          로그인
        </Button>
      </Box>
    </Box>
  );
}
