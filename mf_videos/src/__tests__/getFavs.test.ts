import { getFavs } from "../utils/getFavs";
import { describe, test, expect, beforeEach } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import mockFavorites from "../../__mocks__/mockStorageFavorites.json";

describe("a function that will fetch favorites from the server", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  test("it should return a list of favorites", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockFavorites));
    const favList = document.createElement("ul");
    await getFavs(favList);
    expect(favList.children.length).toBe(2);
  });

  test("the list it recieves should recieve the correct structure", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockFavorites));
    const favList = document.createElement("ul");
    await getFavs(favList);
    expect(favList.children[0].tagName.toLowerCase()).toBe("li");
    expect(favList.children[0].children[0].tagName.toLowerCase()).toBe(
      "video-component"
    );
  });
});
