import { VideoComponent } from "../components/video-component.js";

interface Favorite {
  channel: string;
  thumbnail: string;
  id: string;
  title: string;
}

export const getFavs = async (favList: HTMLUListElement) => {
  try {
    const response = fetch(`http://localhost:3000/storage/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const favorites = await (await response).json();

    favList.innerHTML = "";

    favorites.forEach((favorite: Favorite) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("class", "video-list-item");
      const videoComponent = new VideoComponent();

      videoComponent.setAttribute("video-id", favorite.id);
      videoComponent.setAttribute("video-title", favorite.title);
      videoComponent.setAttribute("video-channel", favorite.channel);
      videoComponent.setAttribute("video-thumbnail", favorite.thumbnail);

      listItem.appendChild(videoComponent);

      favList.appendChild(listItem);

      listItem.style.listStyle = "none";
    });
  } catch (error) {
    return undefined;
  }
};
