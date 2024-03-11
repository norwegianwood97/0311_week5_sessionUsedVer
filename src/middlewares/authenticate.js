// 쿠키버전
// import jwt from "jsonwebtoken";

// const authenticate = (req, res, next) => {
//     const token = req.cookies['token'];
//     const formattedToken = token ? token.replace("Bearer ", "") : null;

//     try {
//       const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: "토큰이 만료되었습니다." });
//     }

//     if (!formattedToken) {
//       return res.status(401).json({ message: "토큰이 만료되었습니다." });
//     }
// };

// export default authenticate;

// 세션 버전

const authenticate = (req, res, next) => {
  // 세션에 저장된 사용자 정보가 있는지 확인
  if (req.session && req.session.userId) {
    next(); // 사용자 정보가 있으면 다음 미들웨어로 이동
  } else {
    // 사용자 정보가 세션에 없으면 인증되지 않은 것으로 간주하고 오류 메시지 반환
    return res.status(401).json({ message: "사용자 인증이 필요합니다." });
  }
};

export default authenticate;
