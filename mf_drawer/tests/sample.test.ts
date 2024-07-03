import {
  expect,
  jest,
  test,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from "@jest/globals";
import { fetchFavorites } from "../src/index";
import fetch from "node-fetch";
// TODO CONTINUAR AQUI
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  } as Response)
);

const mockResponse = [
  { id: "1", title: "title" },
  { id: "2", title: "title" },
];

describe("fetch the length of favorite list", () => {
  test("should return the length of the favorite list", async () => {
    const favoritesCount = await fetchFavorites();
    expect(favoritesCount).toBe(1);
  });
});
