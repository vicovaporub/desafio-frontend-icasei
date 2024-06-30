export class VideoComponent extends HTMLElement {
    private titleElement: HTMLElement;
    private thumbnailElement: HTMLImageElement;
    private descriptionElement: HTMLElement;
  
    constructor() {
      super();
  
      const shadow = this.attachShadow({ mode: 'open' });
  
      const container = document.createElement('div');
      container.setAttribute('class', 'video-container');
  
      this.titleElement = document.createElement('h2');
      this.titleElement.setAttribute('class', 'video-title');
  
      this.thumbnailElement = document.createElement('img');
      this.thumbnailElement.setAttribute('class', 'video-thumbnail');
  
      this.descriptionElement = document.createElement('p');
      this.descriptionElement.setAttribute('class', 'video-description');
  
      shadow.appendChild(container);
      container.appendChild(this.titleElement);
      container.appendChild(this.thumbnailElement);
      container.appendChild(this.descriptionElement);
    }
  
    static get observedAttributes() {
      return ['title', 'thumbnail', 'description'];
    }
  
    attributeChangedCallback(name: string, value: string) {
      if (name === 'title') {
        this.titleElement.textContent = value;
      }
      if (name === 'thumbnail') {
        this.thumbnailElement.src = value;
      }
      if (name === 'description') {
        this.descriptionElement.textContent = value;
      }
    }
  }
  
  customElements.define('video-component', VideoComponent);
  