// src/middlewares/log.middleware.js
import winston from "winston";
import process from "process";
import logger from "./logger.js";

const { combine, timestamp, label, printf } = winston.format;

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});


// 로그 미들웨어 함수 정의
const logMiddleware = (req, res, next) => {
  const start = new Date().getTime();
  res.on("finish", () => {
    const duration = new Date().getTime() - start;
    logger.info(
      `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Duration: ${duration}ms`
    );
  });
  next();
};

export default logMiddleware;
