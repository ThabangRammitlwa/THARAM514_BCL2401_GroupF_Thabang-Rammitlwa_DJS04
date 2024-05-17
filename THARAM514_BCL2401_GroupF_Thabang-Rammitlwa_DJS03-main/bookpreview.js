class BookPreview extends HTMLElement {
    constructor() {
      super();
  
      // Create shadow DOM and append template content
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML=`
 <><div class="overlay">
              <div class="overlay__preview">
                  <img class="overlay__blur" data-list-blur src="" />
                  <img class="overlay__image" data-list-image src="" />
              </div>
              <div class="overlay__content">
                  <h3 class="overlay__title" data-list-title></h3>
                  <div class="overlay__data" data-list-subtitle></div>
                  <p class="overlay__data overlay__data_secondary" data-list-description></p>
              </div>
              <div class="overlay__row">
                  <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
              </div>
          </div><dialog class="overlay" data-list-active>
                  <div class="overlay__preview"><img class="overlay__blur" data-list-blur src="" /><img class="overlay__image" data-list-image src="" /></div>
                  <div class="overlay__content">
                      <h3 class="overlay__title" data-list-title></h3>
                      <div class="overlay__data" data-list-subtitle></div>
                      <p class="overlay__data overlay__data_secondary" data-list-description></p>
                  </div>
                  <div class="overlay__row">
                      <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
                  </div>
              </dialog></>
      
      `;
    }
    
  
    connectedCallback() {
      // Set attributes and text content based on provided data
      const { id, image, title, author } = this.dataset;
      this.shadowRoot.querySelector('.preview').setAttribute('data-preview', id);
      this.shadowRoot.querySelector('.preview__image').src = image;
      this.shadowRoot.querySelector('.preview__title').textContent = title;
      this.shadowRoot.querySelector('.preview__author').textContent = author;
      
      // Add event listener for clicking on the preview
      this.shadowRoot.querySelector('.preview').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('preview-click', { detail: id }));
      });
    }
  
  }
  // Define the custom element
  customElements.define('book-preview', BookPreview);
  