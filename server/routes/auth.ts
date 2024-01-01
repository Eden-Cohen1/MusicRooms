import express from "express";
import {
  postSignup,
  postLogin,
  getLogout,
} from "../controllers/authController.ts";

export const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.get("/logout", getLogout);
