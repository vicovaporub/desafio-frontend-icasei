import { templateBuilder } from "./templateBuilder";
import { Request, Response } from "express";

export const appGetVideos = (req: Request, res: Response) => {
  console.log(`entrou no videos`);
  res.send(templateBuilder("?mode=videos"));
};
