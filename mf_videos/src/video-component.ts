export class VideoComponent extends HTMLElement {
  private iframeElement: HTMLIFrameElement;
  private thumbnailContainer: HTMLDivElement;
  private thumbnailElement: HTMLImageElement;
  private playButtonElement: HTMLDivElement;
  private infoContainer: HTMLDivElement;
  private titleElement: HTMLHeadingElement;
  private channelElement: HTMLParagraphElement;
  private favButtonElement: HTMLDivElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('class', 'search-video-container');

    this.thumbnailContainer = document.createElement('div');
    this.thumbnailContainer.setAttribute('class', 'video-thumbnail-container');

    this.thumbnailElement = document.createElement('img');
    this.thumbnailElement.setAttribute('class', 'video-thumbnail');

    this.playButtonElement = document.createElement('div');
    this.playButtonElement.setAttribute('class', 'play-button');
    this.playButtonElement.innerHTML = `
      <svg fill="#ff0000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 260 180" enable-background="new 0 0 260 180" xml:space="preserve">
        <path d="M220,2H40C19.01,2,2,19.01,2,40v100c0,20.99,17.01,38,38,38h180c20.99,0,38-17.01,38-38V40C258,19.01,240.99,2,220,2z
          M102,130V50l68,40L102,130z"/>
      </svg>
    `;

    this.thumbnailContainer.appendChild(this.thumbnailElement);
    this.thumbnailContainer.appendChild(this.playButtonElement);

    this.iframeElement = document.createElement('iframe');
    this.iframeElement.setAttribute('class', 'video-player');
    this.iframeElement.style.display = 'none'; // Hide iframe initially
    this.iframeElement.setAttribute('frameborder', '0');
    this.iframeElement.setAttribute('allowfullscreen', 'true');

    this.infoContainer = document.createElement('div');
    this.infoContainer.setAttribute('class', 'video-info');

    this.titleElement = document.createElement('h2');
    this.titleElement.setAttribute('class', 'video-title');
    this.infoContainer.appendChild(this.titleElement);
    
    this.favButtonElement = document.createElement('div');
    this.favButtonElement.setAttribute('class', 'fav-button');
    this.favButtonElement.innerHTML = `★`;

    this.infoContainer.appendChild(this.favButtonElement);
    
    this.channelElement = document.createElement('p');
    this.channelElement.setAttribute('class', 'video-channel');
    this.infoContainer.appendChild(this.channelElement);




    mainContainer.appendChild(this.thumbnailContainer);
    mainContainer.appendChild(this.iframeElement); // Append iframe to main container
    mainContainer.appendChild(this.infoContainer);

    shadow.appendChild(mainContainer);

    // Add click event to thumbnail and play button to load and show iframe
    const showVideo = () => {
      const videoId = this.getAttribute('video-id');
      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`;
        this.iframeElement.src = embedUrl;
        this.iframeElement.style.display = 'block';

        // Hide thumbnail and play button after video starts playing
        this.thumbnailElement.style.display = 'none';
        this.playButtonElement.style.display = 'none';
      }
    };

    this.thumbnailContainer.addEventListener('click', showVideo);
    this.playButtonElement.addEventListener('click', showVideo);

    // Inline CSS for VideoComponent
    const style = document.createElement('style');
    style.textContent = `
    .search-video-container {
      position: relative;
    }
  
    .video-thumbnail-container {
      position: relative;
      display: inline-block;
      overflow: hidden; 
    }
  
    .video-thumbnail {
      width: 100%;
      object-fit: cover;
      border: 1px solid #90caf9;
      border-radius: 5px;
      transition: transform 0.3s ease-in-out;
    }
  
    .video-thumbnail-container:hover {
      cursor: pointer;
    }
  
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
      cursor: pointer;
      width: 65px;
      height: 65px;
      z-index: 1;
      transition: transform 0.1s ease-in-out;
      transform-origin: center center; 
    }
  
    .video-thumbnail-container:hover .play-button {
      transform: translate(-50%, -50%) scale(1.2);
    }
  
    .video-player {
      width: 100%;
      height: 195px;
    }
  
    .video-info {
      display: flex;
      flex-direction: column;
      gap: 1px;
      position: relative;
      margin: 0;
      padding: 0;
    }
  
    .video-title {
      margin: 0;
      font-size: 1.2rem;
      text-align: left;
    }
  
    .video-channel {
      color: #606060;
      font-size: 1rem;
      border-bottom: 1px solid #606060;
      padding-bottom: 10px;
    }
  
    .fav-button {
      position: absolute;
      top: 30%;
      right: 10%;
      font-size: 2.5rem;
      color: #b7b7b7;
      cursor: pointer;
      transition: transform 0.1s ease-in-out;
      transform-origin: center center;
    }
  
    .fav-button:hover {
      transform: scale(1.2);
    }
  
    @media (min-width: 768px) {
      .video-player {
        margin: 0;
        width: 400px;
        height: 230px;
      }
  
      .video-channel {
        border: none;
      }
  
      .fav-button {
        top: 40%;
        right: 5%;
      }
    }
  `;

    shadow.appendChild(style);
  }

  static get observedAttributes() {
    return ['video-id', 'video-title', 'video-channel', 'video-thumbnail'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name.toLowerCase() === 'video-title') {
      this.titleElement.textContent = newValue;
    }

    if (name.toLowerCase() === 'video-channel') {
      this.channelElement.textContent = newValue;
    }

    if (name.toLowerCase() === 'video-thumbnail') {
      this.thumbnailElement.src = newValue;
    }
  }
}

customElements.define('video-component', VideoComponent);
