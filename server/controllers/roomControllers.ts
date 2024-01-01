import { Request, Response } from "express";
import { createRoom, Room, FindRoomByNumber } from "../models/Room.ts";
import { findUserById } from "../models/User.ts";

const handleDBErrors = (err: any) => {
  if (err.message.includes("Room validation failed")) {
    let errors = Object.values(err.errors).map((error: any) => {
      return { message: error.properties.message };
    });
    return errors;
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 0;
  const roomsPerPage = 15;
  try {
    const rooms = await Room.find()
      .populate({
        path: "users",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .sort({ createdAt: -1 })
      .limit(roomsPerPage)
      .skip(roomsPerPage * page);
    console.log(rooms);
    res.json(rooms);
  } catch (error) {
    const errors = handleDBErrors(error);
    res.status(400).json(errors);
  }
};

export const getSingleRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const room = await FindRoomByNumber(id);
  await room.populate({
    path: "users",
    populate: {
      path: "user",
      model: "User",
    },
  });
  res.status(200).json(room);
};

export const postAddRoom = async (req: Request, res: Response) => {
  const { name, admin, password } = req.body;
  try {
    const room = await createRoom(name, admin, password);
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
    const errors = handleDBErrors(error);
    res.status(400).json(errors);
  }
};

export const postAddSong = async (req: Request, res: Response) => {
  try {
    const { id, img, title, channel, roomNumber } = req.body;
    const room = await FindRoomByNumber(roomNumber);
    room.playlist.push({ id: id, img: img, title: title, channel: channel });
    room.save();
    res.status(200).json("Song added to playlist");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const postAddUser = async (req: Request, res: Response) => {
  try {
    console.log("1231231231231");
    const { userId, roomNumber } = req.body;
    const room = await FindRoomByNumber(roomNumber);
    room.users.push({ user: userId, admin: false });
    await room.save();
    console.log(room);
    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
  }
};
