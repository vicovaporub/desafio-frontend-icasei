import { Request, Response } from "express";
import axios from "axios";

export const postApiGetVideos = async (req: Request, res: Response) => {
  const query = req.body.text;
  const YT_API_KEY = process.env.YT_API_KEY;
  const YT_API_URL = process.env.YT_API_URL;
  const part = "snippet";
  const type = "video";

  // I'm setting maxResults as 10, but it can be changed
  // pt-BR Estou colocando maxResults como 10, mas pode ser alterado
  const maxResults = 10;

  const serverUrl = `${process.env.SERVER_URL}:${process.env.MAIN_PORT}`;

  const searchParamsString = `?q=${query}&key=${YT_API_KEY}&part=${part}&type=${type}&maxResults=${maxResults}`;

  try {
    const response = await axios.get(`${YT_API_URL}${searchParamsString}`, {
      headers: {
        "Content-Type": "application/json",
        Referer: serverUrl,
      },
    });

    const videos = response.data.items;
    res.send(videos);
  } catch (error) {
    console.log("Error:", error);
  }
};
