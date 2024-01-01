import { Request, Response, Application, NextFunction } from "express";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { router as authRoute } from "../routes/auth.ts";
import { router as roomsRoute } from "../routes/rooms.ts";
import { router as youtubeRoute } from "../routes/youtube.ts";
import { requireAuth } from "../middleware/authMiddleware.ts";

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoURI = process.env.MONGO_URI;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(requireAuth);
app.use("/api/v1", authRoute);
app.use("/api/v1/rooms", roomsRoute);
app.use("/api/v1", youtubeRoute);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  console.log("* request");
  res.sendFile(path.resolve(__dirname, `../../client/dist`, "index.html"));
  next();
});

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

app.listen(port, () => {
  console.log(`connected to port ${port}`);
  connectToDB();
});
