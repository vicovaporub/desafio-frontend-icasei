import { fetchFavorites } from "./fetchFavorites.js";

export const updateStarText = async () => {
  const favoritesCount = await fetchFavorites();
  const starComponent = document.querySelector("star-component");
  if (starComponent) {
    starComponent.setAttribute("star-text", `${favoritesCount}`);
  }
};
