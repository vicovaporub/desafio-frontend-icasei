import { templateBuilder } from "./templateBuilder";
import { Request, Response } from "express";

export const appGetFavs = (req: Request, res: Response) => {
  res.send(templateBuilder("?mode=favs"));
};
