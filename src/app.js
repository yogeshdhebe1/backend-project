import express from "express";
import cors from "cors";
import cookieParsor from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORE_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParsor()); // you can handle the cookie on user chrome

//routes
import userRouter from "./routes/user.routes.js";

//routes declaraton
app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/users/register

export { app };
