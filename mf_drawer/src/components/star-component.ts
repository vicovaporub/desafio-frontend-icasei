export class StarComponent extends HTMLElement {
  private starElement: HTMLDivElement;
  private starIconElement: HTMLDivElement;
  private starTextElement: HTMLDivElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
            .star-container {
                display: inline-block;
                position: relative;
            }
            
            .star {
                position: relative;
                width: 40px;
                height: 40px;
            }
            
            .star-icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .star-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: black;
                font-size: 16px; 
                font-weight: bold;
            }
        `;

    shadow.appendChild(style);

    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("class", "star-container");

    this.starElement = document.createElement("div");
    this.starElement.setAttribute("class", "star");

    this.starIconElement = document.createElement("div");
    this.starIconElement.setAttribute("class", "star-icon");
    this.starIconElement.innerHTML = `
            <svg height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                 viewBox="0 0 47.94 47.94" xml:space="preserve">
                <path style="fill:#d1b726;" d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                    c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                    c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                    c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                    c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                    C22.602,0.567,25.338,0.567,26.285,2.486z"/>
            </svg>`;

    this.starTextElement = document.createElement("div");
    this.starTextElement.setAttribute("class", "star-text");

    this.starElement.appendChild(this.starIconElement);
    this.starElement.appendChild(this.starTextElement);

    mainContainer.appendChild(this.starElement);

    shadow.appendChild(mainContainer);
  }

  static get observedAttributes() {
    return ["star-text"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "star-text") {
      this.starTextElement.textContent = newValue;
    }
  }
}

customElements.define("star-component", StarComponent);
