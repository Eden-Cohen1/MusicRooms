import { validateUserDetails } from "../validators/authValidators.js";
import { User, createUser } from "../models/User.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const maxAge = 3 * 24 * 60 * 60;
dotenv.config();

const handleDBErrors = (err: any) => {
  if (err.code === 11000) {
    return [{ message: "User already registered" }];
  }
  if (err.message.includes("User validation failed")) {
    let errors = Object.values(err.errors).map((error: any) => {
      return { message: error.properties.message };
    });
    return errors;
  }
};

const createToken = (id: string, name: string, email: string) => {
  return jwt.sign({ id: id, name: name, email: email }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const createCookieSendUser = (token: string, res: Response, user: any) => {
  res.cookie("jwt", token, {
    httpOnly: false,
    domain: "localhost",
    secure: false,
    maxAge: maxAge * 1000,
  });
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    await validateUserDetails(name, email, password);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error.messages);
  }

  try {
    const user = await createUser(name, email, password);
    const token = createToken(user.id, user.name, user.email);
    createCookieSendUser(token, res, user);
  } catch (error) {
    const errorMesseages = handleDBErrors(error);
    return res.status(400).json(errorMesseages);
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user.id, user.name, user.email);
    createCookieSendUser(token, res, user);
  } catch (error) {
    return res.status(400).json([{ message: error.message }]);
  }
};

export const getLogout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now()),
  });
  res.status(201).json("Logout success!");
};
