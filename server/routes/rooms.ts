import express from "express";
import {
  getRooms,
  getSingleRoom,
  postAddRoom,
  postAddSong,
  postAddUser,
} from "../controllers/roomControllers.ts";

export const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getSingleRoom);
router.post("/add", postAddRoom);
router.post("/search/add", postAddSong);
router.post("/add-user", postAddUser);
