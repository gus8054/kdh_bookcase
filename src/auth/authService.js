import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 오류 객체타입 정의
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    const message = error.message;
    return Promise.reject({ status, serverMessage, message });
  }
);

// 닉네임 중복확인
export const checkNickname = async (nickname) => {
  await authAPI.get(`/users/${nickname}`);
};
// 회원가입
export const signUp = async (nickname, email, password) => {
  await authAPI.post("/register", {
    nickname,
    email,
    password,
  });
};
// 로그인
export const login = async (email, password, autoLogin) => {
  const { data } = await authAPI.post("/login", { email, password, autoLogin });
  return data.accessToken;
};
// 로그아웃
export const logout = async () => {
  await authAPI.post("/logout");
};
// 토큰 재발급
export const reissueToken = async () => {
  const { data } = await authAPI.post("/reissue");
  console.log(data);
  return data.accessToken;
};

// 깃헙 계정을 통한 회원가입
export const signUpWithOAuth = async (token, nickname) => {
  await authAPI.post("/register/oauth", { token, nickname });
};
