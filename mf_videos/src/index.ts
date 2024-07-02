import { get } from "http"
import { VideoComponent } from "./video-component.js"
const searchInput = document.getElementById('search-input') as HTMLInputElement
const searchButton = document.getElementById('search-button') as HTMLButtonElement
const videoList = document.getElementById('video-list') as HTMLUListElement
const favList = document.getElementById('favs-list') as HTMLUListElement


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

interface Favorite {
  channel: string,
  thumbnail: string,
  id: string,
  title: string
}

const searchVideos = async (): Promise<Video | undefined> => {
  const text = searchInput.value;
  if (!text) {
    return undefined;
  }

  try {
    const response = await fetch('http://localhost:3000/api/getVideos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    const videos = await response.json();
    console.log(videos);

    videoList.innerHTML = '';

    videos.forEach((video: Video) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('class', 'video-list-item');
      const videoComponent = new VideoComponent();

      videoComponent.setAttribute('video-id', video.id.videoId);
      videoComponent.setAttribute('video-title', video.snippet.title);
      videoComponent.setAttribute('video-channel', video.snippet.channelTitle);
      videoComponent.setAttribute('video-thumbnail', video.snippet.thumbnails.medium.url);

      listItem.appendChild(videoComponent);

      videoList.appendChild(listItem);

      listItem.style.listStyle = 'none';

    });

  } catch (error) {
    console.log('Error:', error);
    return undefined;
  }
};


const handleSearch = async (event: Event): Promise<void> => {
  if (event.type === 'click' || (event instanceof KeyboardEvent && event.key === 'Enter')) {
    await searchVideos();
  }
};

const getModeParameter = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('mode');
}

window.onload = () => {
  const mode = getModeParameter();
  document.body.classList.add(mode!);
}

const getFavs = async() => {
  try {
    const response = fetch(`http://localhost:3000/storage/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const favorites = await (await response).json();

    favList.innerHTML = '';

    favorites.forEach((favorite: Favorite) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('class', 'video-list-item');
      const videoComponent = new VideoComponent();

      videoComponent.setAttribute('video-id', favorite.id);
      videoComponent.setAttribute('video-title', favorite.title);
      videoComponent.setAttribute('video-channel', favorite.channel);
      videoComponent.setAttribute('video-thumbnail', favorite.thumbnail);

      listItem.appendChild(videoComponent);

      favList.appendChild(listItem);

      listItem.style.listStyle = 'none';
    });

  } catch (error) {
    console.log('Error:', error);
    return undefined;
  }
}
getFavs()


searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', handleSearch);

