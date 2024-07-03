import { getModeParameter } from "./getModeParameter.js";
import { updateStarText } from "./updateStarText.js";

export const startPage = () => {
  const videosButton = document.getElementById(
    "videos-link"
  ) as HTMLAnchorElement;
  const favsButton = document.getElementById("favs-link") as HTMLAnchorElement;

  document.addEventListener("DOMContentLoaded", () => {
    videosButton!.addEventListener("click", (event) => {
      event.preventDefault();
      top!.window.location.href = "http://localhost:3000/videos";
    });

    favsButton!.addEventListener("click", (event) => {
      event.preventDefault();
      top!.window.location.href = "http://localhost:3000/favs";
    });
  });

  window.addEventListener("message", (event) => {
    if (event.origin !== "http://localhost:3000") {
      return;
    }
    console.log("message recieved: ", event.data);
    updateStarText();
  });
  updateStarText();

  window.onload = () => {
    const mode = getModeParameter();
    document.body.className = "";
    document.body.classList.add(mode!);

    if (document.body.className === "favs") {
      favsButton.style.backgroundColor = "#42a5f6";
      favsButton.style.color = "#fff";
      videosButton.style.backgroundColor = "#fff";
      videosButton.style.color = "#42a5f6";

      videosButton.addEventListener("mouseover", () => {
        videosButton.style.backgroundColor = "#007aff";
        videosButton.style.color = "#fff";
      });

      videosButton.addEventListener("mouseout", () => {
        videosButton.style.backgroundColor = "#fff";
        videosButton.style.color = "#42a5f6";
      });

      favsButton.addEventListener("mouseover", () => {
        favsButton.style.backgroundColor = "#007aff";
        favsButton.style.color = "#fff";
      });

      favsButton.addEventListener("mouseout", () => {
        favsButton.style.backgroundColor = "#42a5f6";
        favsButton.style.color = "#fff";
      });
    }
  };
};
