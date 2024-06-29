const searchInput = document.getElementById('search-input') as HTMLInputElement
const searchButton = document.getElementById('search-button') as HTMLButtonElement
const videoList = document.getElementById('video-list') as HTMLUListElement


interface VideoSnippet {
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };  
}  

interface Video {
  id: { videoId: string };
  snippet: VideoSnippet;
}  

const searchVideos = async (): Promise<Video | undefined> => {
  const text = searchInput.value; 
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
      listItem.innerHTML = `
        <h2>${video.snippet.title}</h2>
        <p>${video.snippet.description}</p>
        <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
      `;

      videoList.appendChild(listItem);

    })

  } catch (error) {
    console.log('Error:', error);
    return undefined;
  }
};

searchButton.addEventListener('click', async () => {
  await searchVideos()
});


