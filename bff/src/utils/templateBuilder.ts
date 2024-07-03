import path from "path";
import fs from "fs";

export const templateBuilder = (param: string = "") => {
  const VIDEOS_URL = process.env.VIDEOS_URL || "";
  const DRAWER_URL = process.env.DRAWER_URL || "";
  const VIDEOS_URL_PARAM = `${VIDEOS_URL}${param}`;
  const DRAWER_URL_PARAM = `${DRAWER_URL}${param}`;
  const template = fs
    .readFileSync(path.join(__dirname, "..", "templates", "index.html"))
    .toString();

  const finalTemplate = template
    .replace(/{{VIDEOS_URL}}/g, VIDEOS_URL_PARAM)
    .replace(/{{DRAWER_URL}}/g, DRAWER_URL_PARAM);

  return finalTemplate;
};
