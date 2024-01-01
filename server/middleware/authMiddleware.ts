import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const key = process.env.SECRET;

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path === "/api/v1/login" ||
    req.path === "/api/v1/signup" ||
    req.path === "/api/v1/logout"
  ) {
    next();
    return;
  }
  console.log("1");
  const token: any = req.headers.token;
  if (token) {
    jwt.verify(token, key, (err: any, decodedToken: string) => {
      if (err) {
        console.log(err.message);
        res.status(400).redirect("/user/login");
      } else {
        console.log("2");
        next();
      }
    });
  } else {
    console.log("3");
    return res
      .status(401)
      .json([{ message: "User unauthorized, please login" }]);
  }
};
