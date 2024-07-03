import { fetchFavoritesLength } from "./fetchFavoritesLength.js";

export const updateStarText = async () => {
  try {
    const favoritesCount = await fetchFavoritesLength();
    const starComponent = document.querySelector("star-component");
    if (starComponent) {
      starComponent.setAttribute("star-text", `${favoritesCount}`);
    }
  } catch (error) {
    throw new Error();
  }
};
