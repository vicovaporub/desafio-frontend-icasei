import { templateBuilder } from "./templateBuilder";
import { Request, Response } from "express";

export const appGetVideos = (req: Request, res: Response) => {
  res.send(templateBuilder("?mode=videos"));
};
