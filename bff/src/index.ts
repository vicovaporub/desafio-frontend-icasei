import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { appGetVideos } from "./utils/appGetVideos";
import { appGetFavs } from "./utils/appGetFavs";
import { appGetHome } from "./utils/appGetHome";
import { postApiGetVideos } from "./utils/appPostApiGetVideos";
import {
  postStorageFavorites,
  getStorageFavoritesVideoId,
  getStorageFavorites,
} from "./utils/handleFavorites";
import { listen } from "./utils/appListen";

dotenv.config();

export const app = express();
const port = process.env.MAIN_PORT;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/videos", appGetVideos);

app.get("/favs", appGetFavs);

app.get("/", appGetHome);

app.post("/api/getVideos", postApiGetVideos);

app.post("/storage/favorites", postStorageFavorites);

app.get("/storage/favorites/:videoId", getStorageFavoritesVideoId);

app.get("/storage/favorites", getStorageFavorites);

app.listen(port, listen);
