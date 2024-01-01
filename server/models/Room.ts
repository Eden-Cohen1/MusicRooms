import { Schema, model } from "mongoose";
import { User } from "./User.ts";
import { customAlphabet } from "nanoid";
import { ObjectId } from "mongodb";

const roomSchema = new Schema({
  users: [
    {
      user: { type: Schema.Types.ObjectId, ref: User, unique: true },
      admin: Boolean,
    },
  ],

  number: {
    type: String,
    required: true,
    default: () => customAlphabet("1234567890", 6)(),
    index: { unique: true },
  },
  name: {
    type: String,
    required: true,
    minLength: [3, "name needs to be at least 3 characters"],
    maxLneght: [20, "max name lenght is 20 characters"],
  },
  password: {
    type: String,
    minLength: [3, "password needs to be at least 3 characters"],
    maxLneght: [10, "max password lenght is 10 characters"],
  },
  playlist: [{ id: String, img: String, title: String, channel: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //add chat ref, playlisy ref
});

export const Room = model("Room", roomSchema);

export const createRoom = async (
  name: string,
  userId: ObjectId,
  password?: string
) => {
  const room = await Room.create({
    name: name,
    password: password || null,
  });
  room.users.push({ user: userId, admin: true });
  return room;
};

export const FindRoomByNumber = async (number: String) => {
  return await Room.findOne({ number: number });
};
