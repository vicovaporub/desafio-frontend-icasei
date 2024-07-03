import { Request, Response } from "express";
import axios from "axios";

export const postApiGetVideos = async (req: Request, res: Response) => {
  console.log(`Request recieved: ${req.body}`);
  const query = req.body.text;
  console.log("query:", query);
  const YT_API_KEY = process.env.YT_API_KEY;
  const YT_API_URL = process.env.YT_API_URL;
  const part = "snippet";
  const type = "video";
  const maxResults = 21;

  const serverUrl = `${process.env.SERVER_URL}:${process.env.MAIN_PORT}`;

  const searchParamsString = `?q=${query}&key=${YT_API_KEY}&part=${part}&type=${type}&maxResults=${maxResults}`;
  console.log(`${YT_API_URL}${searchParamsString}`);

  try {
    const response = await axios.get(`${YT_API_URL}${searchParamsString}`, {
      headers: {
        "Content-Type": "application/json",
        Referer: serverUrl,
      },
    });

    const videos = response.data.items;
    console.log(videos);
    res.send(videos);
  } catch (error) {
    console.log("Error:", error);
  }
};
