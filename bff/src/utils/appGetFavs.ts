import { templateBuilder } from "./templateBuilder";
import { Request, Response } from "express";

export const appGetFavs = (req: Request, res: Response) => {
  console.log(`entrou no favs`);
  res.send(templateBuilder("?mode=favs"));
};
