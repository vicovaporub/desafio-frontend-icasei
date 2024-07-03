import { appGetHome } from "../src/utils/appGetHome";
import { templateBuilder } from "../src/utils/templateBuilder";
import { describe, test, expect, jest } from "@jest/globals";
import { Request, Response } from "express";

describe("server function that will call templateBuilder with videos mode", () => {
  test("should return a string with the html template", () => {
    const req = {} as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    appGetHome(req, res);
    expect(res.send).toHaveBeenCalledWith(templateBuilder("?mode=videos"));
  });
});
