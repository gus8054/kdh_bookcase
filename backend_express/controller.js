import { pool } from "./db.js";
import { generateAccessToken, generateRefreshToken } from "./util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import uniqueString from "unique-string";
import axios from "axios";

const checkEmailExist = async (email) => {
  // 이메일이 존재하면 true, 이메일이 없다면 false
  try {
    const sql = "SELECT `email` FROM `users` WHERE `email` = ?";
    const [rows, _] = await pool.execute(sql, [email]);
    if (rows.length != 0) return true;
    else return false;
  } catch (err) {
    console.error(err);
    throw new Error("checkEmailExist");
  }
};
export const checkNicknameExist = async (req, res) => {
  const nickname = req.params.nickname;

  try {
    const sql = "SELECT `nickname` FROM `users` WHERE `nickname` = ?";
    const [rows, _] = await pool.execute(sql, [nickname]);
    if (rows.length == 0) return res.json({ message: "available nickname" });
    else
      return res.status(409).json({ message: "이미 존재하는 닉네임입니다." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  const { nickname, email, password } = req.body;
  try {
    // 이메일 중복 체크
    const isEmailExist = await checkEmailExist(email);
    if (isEmailExist)
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    // 비밀번호 암호화
    const hashed = await bcrypt.hash(password, 10);
    // users 테이블에 레코드 생성
    const sql =
      "INSERT INTO `users`(`nickname`, `email`, `password_hash`) VALUES(?,?,?)";
    await pool.execute(sql, [nickname, email, hashed]);
    return res.json({ message: "register success" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

const getUser = async (email) => {
  try {
    const sql = "SELECT * FROM `users` WHERE `email` = ?";
    const [rows, fields] = await pool.execute(sql, [email]);
    if (rows.length === 0) return null;
    else return rows[0];
  } catch (err) {
    console.error(err.message);
    throw new Error("getUser");
  }
};

const saveRefreshToken = async (userid, refreshToken) => {
  try {
    const sql =
      "INSERT INTO `refresh_tokens`(`user_id`, `token`, `expires_at`) VALUES(?,?,?)";
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일
    await pool.execute(sql, [userid, refreshToken, expiresAt]);
  } catch (err) {
    console.error(err.message);
    throw new Error("saveRefreshToken");
  }
};

export const login = async (req, res) => {
  const { email, password, autoLogin } = req.body;
  try {
    // db에 이메일 존재하는지 확인
    const user = await getUser(email);
    if (!user)
      return res.status(400).json({ message: "존재하지 않는 이메일입니다." });
    // 패스워드 일치 확인
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(400).json({ message: "이메일/비밀번호 오류" });

    // JWT 토큰 생성 (액세스, 리프레시)
    const payload = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // 리프레시 토큰 db저장 (관리및 블랙리스트용)
    await saveRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // TODO: 배포후 수정
      sameSite: "none", // TODO: 배포후 수정 'strict'로
      maxAge: autoLogin ? 7 * 24 * 60 * 60 * 1000 : null,
      path: "/",
    });
    return res.json({ accessToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getRefreshTokenFromDB = async (refreshToken) => {
  try {
    const sql = "SELECT * FROM `refresh_tokens` WHERE `token` = ?";
    const [rows, fields] = await pool.execute(sql, [refreshToken]);
    if (rows.length == 0) return null;
    return rows[0];
  } catch (err) {
    console.error(err.message);
    throw new Error("getRefreshTokenFromDB");
  }
};

export const reissueAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  // 쿠키에 토큰이 없을 경우
  if (!token) return res.status(400).json({ message: "refresh token 없음" });
  // 토큰이 이 서버에서 만들어진 토큰이 맞는지 검사
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(403).json({ message: "refresh token이 유효하지 않음." });
  }
  // DB에서도 유효성 검증
  try {
    const dbToken = await getRefreshTokenFromDB(token);
    if (!dbToken || dbToken.revoked || dbToken.expires_at < new Date()) {
      return res
        .status(403)
        .json({ message: "refresh token이 유효하지 않음." });
    }
  } catch (err) {
    return res.status(403).json({ message: "refresh token이 유효하지 않음." });
  }
  const accessToken = generateAccessToken(decoded);
  return res.json({ accessToken });
};

const setBlackList = async (token) => {
  try {
    const sql = "UPDATE `refresh_tokens` SET `revoked` = 1 WHERE `token` = ?";
    const [result, _] = await pool.execute(sql, [token]);
    if (result.affectedRows == 0) throw new Error("token이 DB에 없음");
    return true;
  } catch (err) {
    console.error(err.message);
    throw new Error("setBlackList");
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  try {
    if (token) await setBlackList(token);
    res.clearCookie("refreshToken");
    res.json({ message: "logout success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const redirectGithub = (req, res) => {
  const state = uniqueString(); // CSRF 방지용 토큰
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT,
    redirect_uri: `${process.env.BACK_END_URL}/auth/github/callback`,
    scope: "user:email",
    state,
  });
  const baseURL = "https://github.com/login/oauth/authorize";
  const redirectUrl = baseURL + "?" + params.toString();
  res.redirect(redirectUrl);
};

const getAccessTokenFromGithub = async (code, state) => {
  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.BACK_END_URL}/auth/github/callback`,
        state,
      },
      { headers: { Accept: "application/json" } }
    );
    return tokenRes.data.access_token;
  } catch (err) {
    console.error(err);
    throw new Error("getAccessTokenFromGithub");
  }
};

const getEmailFromGithub = async (accessToken) => {
  try {
    const { data } = await axios.get("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data[0].email || data[1].email;
  } catch (err) {
    console.error(err);
    throw new Error("getEmailFromGithub");
  }
};

export const githubCallback = async (req, res) => {
  const { code, state } = req.query;
  try {
    // code로 Access Token 요청
    const githubAccessToken = await getAccessTokenFromGithub(code, state);
    // Access Token으로 사용자 이메일 요청
    const email = await getEmailFromGithub(githubAccessToken);
    // db에 이메일 존재하는지 확인
    const user = await getUser(email);
    // 없으면 회원가입으로 넘어감.
    if (!user) {
      const token = uniqueString(); //csrf 방지용
      req.session.signupToken = token;
      req.session.githubEmail = email;
      return res.redirect(
        `${process.env.FRONT_END_URL}/oauth-register?token=${token}`
      );
    }
    // JWT 토큰 생성 (액세스, 리프레시)
    const payload = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    };
    const refreshToken = generateRefreshToken(payload);
    // 리프레시 토큰 db저장 (관리및 블랙리스트용)
    await saveRefreshToken(user.id, refreshToken);
    // 리프레시 쿠키 설정
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // TODO: 배포후 수정
      sameSite: "none", // TODO: 배포후 수정 'strict' 또는 'none' 서브도메인끼리는 같은 도메인으로 취급안함.
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.redirect(process.env.FRONT_END_URL);
  } catch (err) {
    console.error(err.message);
    return res.redirect(
      `${process.env.FRONT_END_URL}/oauth-login/error?message=${err.message}`
    );
  }
};

export const createOAuthUser = async (req, res) => {
  const { token, nickname } = req.body;
  if (!token) return res.status(403).json({ message: "invalid token" });
  if (!req.session?.signupToken)
    return res.status(403).json({ message: "invalid access" });
  if (token !== req.session.signupToken)
    return res.status(403).json({ message: "invalid token" });
  const email = req.session?.githubEmail;
  if (!email) return res.status(403).json({ message: "invalid access" });
  try {
    const sql =
      "INSERT INTO `users`(`nickname`, `email`, `oauth_service`) VALUES(?,?,?)";
    await pool.execute(sql, [nickname, email, "github"]);
    return res.json({ message: "register success" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const setUserBookContent = async (req, res) => {
  const {
    google_book_id,
    book_title,
    book_authors,
    book_thumbnail,
    rating,
    memo,
    chapters,
  } = req.body;
  const user = req.user;
  const sqlBook = `
    INSERT INTO books (user_id, google_book_id, title, authors, thumbnail_url, rating, memo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE rating = VALUES(rating), memo = VALUES(memo)
  `;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.execute(sqlBook, [
      user.id,
      google_book_id,
      book_title,
      book_authors,
      book_thumbnail,
      rating,
      memo,
    ]);
    let books_PK = result.insertId;
    if (books_PK === 0) {
      const sqlGetUserBookId = `
      SELECT id FROM books WHERE user_id = ? AND google_book_id = ?`;
      const [rows] = await conn.execute(sqlGetUserBookId, [
        user.id,
        google_book_id,
      ]);
      books_PK = rows[0].id;
    }

    // 새로운 데이터와 수정 데이터를 mysql이 지원하는 쿼리문으로 동일하게 수행
    const sqlChapter = `
    INSERT INTO chapters (uuid, user_book_id, title, position)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE title = VALUES(title), position = VALUES(position)
    `;
    for (const chapter of chapters) {
      const { uuid, position, title } = chapter;
      await conn.execute(sqlChapter, [uuid, books_PK, title, position]);
    }

    const requestChapterUuids = chapters.map((chapter) => chapter.uuid);
    const sqlGetChapterUuids = `SELECT uuid FROM chapters WHERE user_book_id = ?`;
    const [rows] = await conn.execute(sqlGetChapterUuids, [books_PK]);
    console.log("BEFORE: ", rows);
    // DB 데이터를 순회하며 요청 데이터에 없으면 삭제된 것.
    const willDeleteRows = rows.filter(
      ({ uuid }) => !requestChapterUuids.includes(uuid)
    );
    console.log("WILL DELETE", willDeleteRows);
    // 삭제 수행
    if (willDeleteRows.length > 0) {
      const placeholders = willDeleteRows.map(() => "?").join(",");
      const willDeleteUUIDs = willDeleteRows.map((row) => row.uuid);
      const sqlChapterDelete = `DELETE FROM chapters WHERE uuid IN (${placeholders})`;
      await conn.execute(sqlChapterDelete, willDeleteUUIDs);
    }

    await conn.commit();
    return res.json({ message: "success" });
  } catch (err) {
    await conn.rollback();
    console.error("Transaction failed:", err);
    return res.status(500).json({ error: "DB transaction failed" });
  } finally {
    conn.release();
  }
};

export const getUserBookContent = async (req, res) => {
  const { bookid: google_book_id } = req.params;
  const user = req.user;
  const sqlUserBookId = `
  SELECT id, rating, memo FROM books WHERE user_id = ? AND google_book_id = ?
  `;
  try {
    const [rows1] = await pool.execute(sqlUserBookId, [
      user.id,
      google_book_id,
    ]);
    const data = {};
    if (rows1.length === 0) return res.json({ data });

    const userBookId = rows1[0].id;
    data.rating = rows1[0].rating;
    data.memo = rows1[0].memo;

    const sql = `
    SELECT uuid, title, position 
    FROM chapters
    WHERE user_book_id = ?
    `;
    const [rows2] = await pool.execute(sql, [userBookId]);
    if (rows2.length === 0) return res.json({ data });
    data.chapters = rows2.map(({ uuid, title, position }) => ({
      uuid,
      title,
      position,
    }));
    return res.json({ data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const setSummary = async (req, res) => {
  const {
    google_book_id,
    book_title,
    book_authors,
    book_thumbnail,
    chapterUUID,
    markdown,
  } = req.body;
  const user = req.user;
  const sqlBook = `
    INSERT INTO books (user_id, google_book_id, title, authors, thumbnail_url)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE id = id 
  `;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.execute(sqlBook, [
      user.id,
      google_book_id,
      book_title,
      book_authors,
      book_thumbnail,
    ]);
    let books_PK = result.insertId;
    if (books_PK === 0) {
      const sqlGetUserBookId = `
      SELECT id FROM books WHERE user_id = ? AND google_book_id = ?`;
      const [rows] = await conn.execute(sqlGetUserBookId, [
        user.id,
        google_book_id,
      ]);
      books_PK = rows[0].id;
    }

    const sqlChapter = `
    INSERT INTO chapters (uuid, user_book_id, content_md, last_opened_at)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE content_md = VALUES(content_md), last_opened_at = VALUES(last_opened_at)
    `;
    await conn.execute(sqlChapter, [
      chapterUUID,
      books_PK,
      markdown,
      new Date(),
    ]);

    await conn.commit();
    return res.json({ message: "success" });
  } catch (err) {
    await conn.rollback();
    console.error("Transaction failed:", err);
    return res.status(500).json({ error: "DB transaction failed" });
  } finally {
    conn.release();
  }
};

export const getSummary = async (req, res) => {
  const { chapterid } = req.params;
  const sql = `
  SELECT content_md FROM chapters WHERE uuid = ?
  `;
  try {
    const [rows] = await pool.execute(sql, [chapterid]);
    let data = { content_md: "" };
    if (rows.length === 0) return res.json({ data });
    data.content_md = rows[0].content_md;
    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getUserBooks = async (req, res) => {
  const { userid } = req.params;
  const sql = `SELECT books.id, books.google_book_id, books.title, books.authors, books.thumbnail_url, books.read_count, books.rating, MAX(last_opened_at) as last_opened_at
  FROM books JOIN chapters ON books.id = chapters.user_book_id
  WHERE user_id = ?
  GROUP BY books.id, books.google_book_id, books.title, books.authors, books.thumbnail_url, books.read_count, books.rating`;
  try {
    const [rows] = await pool.execute(sql, [userid]);
    const data = rows;
    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const removeUser = async (req, res) => {
  const { userid } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  try {
    await pool.execute(sql, [userid]);
    return res.json({ message: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getChapters = async (req, res) => {
  const { userid, bookid } = req.params;
  const sql = `
  SELECT books.title as book_title, 
  books.read_count, chapters.uuid, chapters.title as chapter_title, 
  chapters.position, chapters.last_opened_at
  FROM books LEFT JOIN chapters ON books.id = chapters.user_book_id
  WHERE books.user_id = ? AND books.google_book_id = ?`;
  try {
    const [rows] = await pool.execute(sql, [userid, bookid]);
    const { book_title, read_count } = rows[0];
    const chapters = rows
      .filter((chapter) => chapter.uuid)
      .map(({ uuid, chapter_title, position, last_opened_at }) => ({
        uuid,
        chapter_title,
        position,
        last_opened_at,
      }));
    const data = {
      book_title,
      read_count,
      chapters,
    };
    return res.json({ data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const setReadCount = async (req, res) => {
  const { userid, bookid } = req.params;
  const { read_count } = req.body;
  const sql = `UPDATE books
  SET read_count = ?
  WHERE user_id = ? AND google_book_id = ?`;
  try {
    await pool.execute(sql, [read_count, userid, bookid]);
    return res.json({ message: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export const checkHealth = (req, res) => {
  res.type("text/plain");
  return res.send("ok");
};
export const checkDBConnect = async (req, res) => {
  const sql = `SELECT id FROM users WHERE id = 1`;
  res.type("text/plain");
  try {
    await pool.execute(sql);
    return res.send("connect");
  } catch (err) {
    return res.send(err.message);
  }
};
