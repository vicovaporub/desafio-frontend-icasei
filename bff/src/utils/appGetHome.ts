import { Request, Response } from "express";
import { templateBuilder } from "./templateBuilder";

export const appGetHome = (req: Request, res: Response) => {
  res.send(templateBuilder("?mode=videos"));
};
