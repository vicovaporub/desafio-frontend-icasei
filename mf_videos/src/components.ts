export class VideoComponent extends HTMLElement {
    private iframeElement: HTMLIFrameElement
    private infoElement: HTMLDivElement
    private titleElement: HTMLHeadingElement
    private channelElement: HTMLParagraphElement

  
    constructor() {
      super();
  
       const shadow = this.attachShadow({ mode: 'open' });
  
       const container = document.createElement('div');
       container.setAttribute('class', 'search-video-container');
       container.setAttribute('id', 'search-video-container');

      this.iframeElement = document.createElement('iframe');
      this.iframeElement.setAttribute('class', 'video-player');
      this.iframeElement.setAttribute('id', 'video-player')
      //TODO: isso aqui nao ta funcionando
      // this.iframeElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      // this.iframeElement.allowFullscreen = true;
      this.infoElement = document.createElement('div');
      this.infoElement.setAttribute('class', 'video-info');

      this.titleElement = document.createElement('h2');
      this.titleElement.setAttribute('class', 'video-title');
      this.infoElement.appendChild(this.titleElement);

      this.channelElement = document.createElement('p');
      this.channelElement.setAttribute('class', 'video-channel');
      this.infoElement.appendChild(this.channelElement);
      
  
      shadow.appendChild(container);
      container.appendChild(this.iframeElement);
      container.appendChild(this.infoElement)
    }
  
    static get observedAttributes() {
      return [ 'video-id', 'video-title', 'video-channel'];
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === 'video-id') {
        this.iframeElement.src = `https://www.youtube.com/embed/${newValue}`
      }

      if (name === 'video-title') {
        this.titleElement.textContent = newValue
      }

      if (name === 'video-channel') {
        this.channelElement.textContent = newValue
      }
    }
  }
  
  customElements.define('video-component', VideoComponent);
  