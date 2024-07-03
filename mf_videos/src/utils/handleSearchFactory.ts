import { searchVideos } from "./searchVideos.js";

export const handleSearchFactory = (videoList: HTMLUListElement) => {
  return async (event: Event): Promise<void> => {
    if (
      event.type === "click" ||
      (event instanceof KeyboardEvent && event.key === "Enter")
    ) {
      await searchVideos(videoList);
    }
  };
};
