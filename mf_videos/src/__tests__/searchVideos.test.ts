import { searchVideos } from "../utils/searchVideos";
import { describe, test, expect, beforeEach } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import mockFavorites from "../../__mocks__/mockStorageFavorites.json";

describe("searchVideos function", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  test("should search and render videos correctly", async () => {
    document.body.innerHTML =
      '<input id="search-input" type="text" value="test query" />';

    fetchMock.mockResponseOnce(JSON.stringify(mockFavorites));

    document.body.innerHTML += '<ul id="videoList"></ul>';
    const videoList = document.getElementById("videoList") as HTMLUListElement;

    await searchVideos(videoList);

    expect(videoList.innerHTML).not.toBe("");
    expect(videoList.querySelectorAll(".video-list-item").length).toBe(
      mockFavorites.length
    );

    mockFavorites.forEach((video) => {
      const listItem = videoList.querySelector(
        `[video-id="${video.id.videoId}"]`
      );
      expect(listItem).toBeTruthy();
    });
  });
});
