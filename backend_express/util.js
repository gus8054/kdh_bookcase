import jwt from "jsonwebtoken";
// 토큰 생성 함수
export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, nickname: user.nickname },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );
}
export function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, nickname: user.nickname },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
}
