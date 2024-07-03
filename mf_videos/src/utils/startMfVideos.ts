import { getModeParameter } from "./getModeParameter.js";
import { getFavs } from "./getFavs.js";
import { handleSearchFactory } from "./handleSearchFactory.js";

//This function is set to initialize all the things that needs to be set in the page when opened
//pt-BR: Essa função vai iniciar todas as coisas que precisam ser ativadas na página quando ela é aberta

export const startMfVideos = () => {
  const searchInput = document.getElementById(
    "search-input"
  ) as HTMLInputElement;
  const searchButton = document.getElementById(
    "search-button"
  ) as HTMLButtonElement;
  const videoList = document.getElementById("video-list") as HTMLUListElement;
  const favList = document.getElementById("favs-list") as HTMLUListElement;

  window.onload = () => {
    const mode = getModeParameter();
    document.body.classList.add(mode!);
  };

  getFavs(favList);

  const handleSearch = handleSearchFactory(videoList);

  document.addEventListener("DOMContentLoaded", () => {
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keydown", handleSearch);
  });
};
