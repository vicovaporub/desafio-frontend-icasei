import { getStorageFavorites } from "../src/utils/handleFavorites";
import { Request, Response } from "express";
import { favoriteVideos } from "../src/utils/handleFavorites";
import { describe, test, jest, expect } from "@jest/globals";

describe("server function that return the list of favorite videos", () => {
  test("should return a list of favorite videos", () => {
    const req = {} as Request;
    const res = {
      send: jest.fn(),
    } as unknown as Response;
    getStorageFavorites(req, res);
    expect(res.send).toHaveBeenCalledWith(favoriteVideos);
  });
});
