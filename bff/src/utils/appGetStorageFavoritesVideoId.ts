import { Request, Response } from "express";

interface FavoriteVideos {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
}

let favoriteVideos: FavoriteVideos[] = [];

export const getStorageFavoritesVideoId = (req: Request, res: Response) => {
  const videoId = req.params.videoId;

  const isFavorite = favoriteVideos.some((video) => video.id === videoId);

  res.json({ isFavorite });
};
