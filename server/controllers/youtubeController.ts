import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.YOUTUBE_KEY;
const singleVidURL = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet`;
const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=50`;

export const getSearchSongs = async (req: Request, res: Response) => {
  const { search } = req.query;
  console.log(search);
  const reqURL = `${searchURL}&q=${search}`;
  const searchResults = await axios(reqURL);
  console.log(searchResults, "results");
  res.status(200).json(searchResults.data.items);
};
