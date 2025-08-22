import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { checkNickname } from "../../auth/authService";
import { signUpWithOAuth } from "../../auth/authService";
import { useNavigate, useSearchParams } from "react-router";

const OAuthRegisterPage = () => {
  const [params, _] = useSearchParams();
  const defaultValues = {
    nickname: "",
    email: "",
    password: "",
    passwordCheck: "",
  };
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    setError,
    clearErrors,
    control,
  } = useForm({ defaultValues });

  const onsubmit = async ({ nickname }) => {
    if (!nicknameChecked) {
      setError("nickname", {
        type: "manual",
        message: "중복확인을 해주세요.",
      });
      return;
    }
    const token = params.get("token");
    try {
      await signUpWithOAuth(token, nickname);
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
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "1rem", width: "100%", textAlign: "center" }}>
            회원가입
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
export default OAuthRegisterPage;
