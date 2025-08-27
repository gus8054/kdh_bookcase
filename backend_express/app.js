import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";

import {
  checkDBConnect,
  checkHealth,
  checkNicknameExist,
  createOAuthUser,
  createUser,
  getChapters,
  getSummary,
  getUserBookContent,
  getUserBooks,
  githubCallback,
  login,
  logout,
  redirectGithub,
  reissueAccessToken,
  removeUser,
  setReadCount,
  setSummary,
  setUserBookContent,
} from "./controller.js";
import { noBrowerCache, verifyToken } from "./middleware.js";

const app = express();
// 프록시 신뢰 설정
app.set("trust proxy", 1);
app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // 매 요청마다 세션 강제 저장하지 않음
    saveUninitialized: false, // 값이 없을 때 빈 세션 저장하지 않음
    cookie: {
      httpOnly: true, // JS에서 쿠키 접근 불가
      secure: process.env.SECURE === "true", // HTTPS에서만 전송 (개발환경에서는 false)
      maxAge: 1000 * 60 * 10, // 세션 유지 시간 (10분)
    },
  })
);
app.use(morgan(process.env.MORGAN));

// 회원가입
app.post("/register", createUser);

// 중복확인
app.get("/users/:nickname", noBrowerCache, checkNicknameExist);

// 로그인
app.post("/login", login);

// 깃헙 로그인
app.get("/auth/github", redirectGithub);

// 깃헙 로그인 콜백url
app.get("/auth/github/callback", githubCallback);

// 깃헙 계정을 이용한 회원가입
app.post("/register/oauth", createOAuthUser);

// 토큰 재발급
app.post("/reissue", reissueAccessToken);

// 로그아웃 시 Refresh Token 블랙리스트 처리
app.post("/logout", logout);

app.get("/token", noBrowerCache, verifyToken, (req, res) =>
  res.json({ message: "success" })
);
app.get("/users/:userid/books/:bookid", verifyToken, getUserBookContent);
app.put("/users/:userid/books/:bookid", verifyToken, setUserBookContent);

app.put(
  "/users/:userid/books/:bookid/chapters/:chapterid",
  verifyToken,
  setSummary
);
app.get(
  "/users/:userid/books/:bookid/chapters/:chapterid",
  verifyToken,
  getSummary
);
app.get("/users/:userid/books", verifyToken, getUserBooks);

app.delete("/users/:userid", verifyToken, removeUser);

app.get("/users/:userid/books/:bookid/chapters", verifyToken, getChapters);

app.patch("/users/:userid/books/:bookid/", verifyToken, setReadCount);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`✅ 서버 실행: ${process.env.BACK_END_URL}`)
);
