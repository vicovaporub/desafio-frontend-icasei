import { Request, Response } from "express";

export interface FavoriteVideos {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
}

export let favoriteVideos: FavoriteVideos[] = [];

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
