// 쿠키 버전 app.js

// import express from 'express';
// import dotenv from 'dotenv';
// import categoryRouter from "./routes/categories.router.js";
// import MenuRouter from "./routes/menus.router.js";
// import signupRouter from "./routes/sign-up.router.js";
// import signinRouter from "./routes/api-sign-in.js";
// import orderRouter from "./routes/orders.router.js";
// import cookieParser from "cookie-parser";
// import Logmiddleware from "./middlewares/log.middleware.js";
// import ErrorMiddleware from "./middlewares/errormiddleware.js";

// dotenv.config();
// console.log(process.env.DATABASE_URL);

// const app = express();
// const PORT = 3020;

// app.use(Logmiddleware);
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api", [categoryRouter, MenuRouter, signupRouter, orderRouter]);
// app.use("/api-sign-in", [signinRouter]);

// app.use(ErrorMiddleware);

// app.listen(PORT, () => {
//     console.log(PORT, '포트로 서버가 열렸어요!');
// });

// 세션버젼 app.js

import express from "express";
import dotenv from "dotenv";
import categoryRouter from "./routes/categories.router.js";
import MenuRouter from "./routes/menus.router.js";
import signupRouter from "./routes/sign-up.router.js";
import signinRouter from "./routes/api-sign-in.js";
import orderRouter from "./routes/orders.router.js";
import cookieParser from "cookie-parser";
import Logmiddleware from "./middlewares/log.middleware.js";
import ErrorMiddleware from "./middlewares/errormiddleware.js";
import expressSession from "express-session";
import expressMysqlSession from "express-mysql-session";

dotenv.config();
console.log(process.env.DATABASE_URL);

const app = express();
const PORT = 3020;

const MySQLStore = expressMysqlSession(expressSession); // expressMysqlSession 을 사용하면 mysql에 세션 정보를 저장한다.
const sessionStore = new MySQLStore({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  expiration: 1000 * 60 * 60 * 24,
  createDatabaseTable: true,
});

app.use(Logmiddleware);
app.use(express.json());
app.use(cookieParser());

const Session = new expressSession({
  secret: process.env.JWT_SECRET,
  resave: false, // 변경사항이 없어도 요청이 올때마다 mysql db에 세션을 새로 저장할건지를 설명
  saveUninitialized: false, // 초기화되지 않은 세션(세션에 아무런 데이터도 저장되지 않은 상태)을 세션 저장소에 저장할지 여부를 결정합니다.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: sessionStore,
});

app.use(Session);

app.use("/api", [categoryRouter, MenuRouter, signupRouter, orderRouter]);
app.use("/api-sign-in", [signinRouter]);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
