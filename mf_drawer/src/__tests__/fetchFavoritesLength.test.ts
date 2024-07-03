import { fetchFavoritesLength } from "../utils/fetchFavoritesLength";
import { describe, test, expect, beforeEach } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import mockFavorites from "../../__mocks__/mockStorageFavs.json";

describe("fetch function to get the length of the favorites list", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("should return the length of the favorites list", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockFavorites));

    const result = await fetchFavoritesLength();

    expect(result).toBe(mockFavorites.length);
  });

  test("should return 0 if the fetch fails", async () => {
    fetchMock.mockReject(new Error("Failed to fetch"));

    const result = await fetchFavoritesLength();

    expect(result).toBe(0);
  });
});
