import express from "express";
import { getSearchSongs } from "../controllers/youtubeController.ts";

export const router = express.Router();

router.get("/search", getSearchSongs);
