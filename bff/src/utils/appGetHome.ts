import { Request, Response } from "express";
import { templateBuilder } from "./templateBuilder";

export const appGetHome = (req: Request, res: Response) => {
  console.log("Request recieved");
  res.send(templateBuilder("?mode=videos"));
};
