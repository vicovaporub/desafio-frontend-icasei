import express, { Request, Response } from "express";
import axios from "axios";
import path from "path";
import fs from "fs";

export const sum = (a: number, b: number) => a + b; //TODO: TIRAR DAQUI

const port = 3000;

interface FavoriteVideos {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
}

let favoriteVideos: FavoriteVideos[] = [];

const templateBuilder = (param: string = "") => {
  const VIDEOS_URL = process.env.VIDEOS_URL || "";
  const DRAWER_URL = process.env.DRAWER_URL || "";
  const VIDEOS_URL_PARAM = `${VIDEOS_URL}${param}`;
  const DRAWER_URL_PARAM = `${DRAWER_URL}${param}`;
  const template = fs.readFileSync(
    path.join(__dirname, "templates", "index.html"),
    "utf8"
  );

  const finalTemplate = template
    .replace(/{{VIDEOS_URL}}/g, VIDEOS_URL_PARAM)
    .replace(/{{DRAWER_URL}}/g, DRAWER_URL_PARAM);

  return finalTemplate;
};

export const appGetVideos = (req: Request, res: Response) => {
  console.log(`entrou no videos`);
  res.send(templateBuilder("?mode=videos"));
};

export const appGetFavs = (req: Request, res: Response) => {
  console.log(`entrou no favs`);
  res.send(templateBuilder("?mode=favs"));
};

export const appGetHome = (req: Request, res: Response) => {
  console.log("Request recieved");
  res.send(templateBuilder("?mode=videos"));
};

export const postApiGetVideos = async (req: Request, res: Response) => {
  console.log(`Request recieved: ${req.body}`);
  const query = req.body.text;
  console.log("query:", query);
  const YT_API_KEY = process.env.YT_API_KEY;
  const YT_API_URL = process.env.YT_API_URL;
  const part = "snippet";
  const type = "video";
  const maxResults = 2;

  const searchParamsString = `?q=${query}&key=${YT_API_KEY}&part=${part}&type=${type}&maxResults=${maxResults}`;
  console.log(`${YT_API_URL}${searchParamsString}`);

  try {
    const response = await axios.get(`${YT_API_URL}${searchParamsString}`, {
      headers: {
        "Content-Type": "application/json",
        Referer: process.env.YT_API_REFERER,
      },
    });

    const videos = response.data.items;
    console.log(videos);
    res.send(videos);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const postStorageFavorites = (req: Request, res: Response) => {
  const { id, title, channel, thumbnail } = req.body;

  if (!id || !title || !channel || !thumbnail) {
    return res
      .status(400)
      .json({ error: "Missing or invalid video information" });
  }

  const existingIndex = favoriteVideos.findIndex((video) => video.id === id);

  if (existingIndex !== -1) {
    favoriteVideos.splice(existingIndex, 1);
    console.log(`Video removed from favorites: ${title}`);

    return res.json({
      isFavorite: false,
      video: { id, title, channel, thumbnail },
    });
  } else {
    favoriteVideos.push({ id, title, channel, thumbnail });
    console.log(`Video added to favorites: ${title}`);

    return res.json({
      isFavorite: true,
      video: { id, title, channel, thumbnail },
    });
  }
};

export const getStorageFavoritesVideoId = (req: Request, res: Response) => {
  const videoId = req.params.videoId;

  const isFavorite = favoriteVideos.some((video) => video.id === videoId);

  res.json({ isFavorite });
};

export const getStorageFavorites = (req: Request, res: Response) => {
  res.send(favoriteVideos);
};

export const listen = () => {
  console.log(`APP listening at http://localhost:${port}`);
};
