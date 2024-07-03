import { VideoComponent } from "../components/video-component.js";

interface Video {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      medium: Thumbnail;
    };
    title: string;
  };
}

interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

export const searchVideos = async (
  videoList: HTMLUListElement
): Promise<Video | undefined> => {
  const input = document.getElementById("search-input") as HTMLInputElement;
  const text = input.value;

  if (!text) {
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/getVideos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const videos = await response.json();
    console.log(videos);

    videoList.innerHTML = "";

    videos.forEach((video: Video) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("class", "video-list-item");
      const videoComponent = new VideoComponent();

      videoComponent.setAttribute("video-id", video.id.videoId);
      videoComponent.setAttribute("video-title", video.snippet.title);
      videoComponent.setAttribute("video-channel", video.snippet.channelTitle);
      videoComponent.setAttribute(
        "video-thumbnail",
        video.snippet.thumbnails.medium.url
      );

      listItem.appendChild(videoComponent);

      videoList.appendChild(listItem);

      listItem.style.listStyle = "none";
    });
  } catch (error) {
    console.log("Error:", error);
    return undefined;
  }
};
