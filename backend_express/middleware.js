import jwt from "jsonwebtoken";

// jwt 검증
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // 토큰이 없을 경우
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("토큰만료다요");
      return res.status(401).json({ message: "토큰이 만료되었습니다." });
    }
    return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
};

// 캐시 기능을 중지
export const noBrowerCache = (req, res, next) => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  res.removeHeader("ETag"); // ETag 기반 조건부 요청 방지
  next();
};
