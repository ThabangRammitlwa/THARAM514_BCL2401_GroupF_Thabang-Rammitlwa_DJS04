import { books, authors,genres } from './scripts.js';

class BookPreview extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM and append template content
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
        /* Add your CSS styles here */
    </style>
    <div class="overlay">
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
        <div class="dropdowns">
            <label for="author-dropdown">Author:</label>
            <select id="author-dropdown" class="author-dropdown">
                <option value="any">Any Author</option>
                ${Object.entries(authors).map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}
            </select>
            <label for="genre-dropdown">Genre:</label>
            <select id="genre-dropdown" class="genre-dropdown">
                <option value="any">Any Genre</option>
                ${Object.entries(genres).map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}
            </select>
        </div>
    </div>
        `;

        // Bind event listener for the close button
        this.shadowRoot.querySelector('[data-list-close]').addEventListener('click', () => {
            this.closePreview();
        });
    }

    connectedCallback() {
        // Get data attributes
        const { id } = this.dataset;

        // Find the book data by ID
        const book = books.find(book => book.id === id);

        // Populate the preview with book data
        if (book) {
            this.shadowRoot.querySelector('.overlay__blur').src = book.image;
            this.shadowRoot.querySelector('.overlay__image').src = book.image;
            this.shadowRoot.querySelector('.overlay__title').textContent = book.title;
            this.shadowRoot.querySelector('.overlay__data').textContent = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
            this.shadowRoot.querySelector('.overlay__data_secondary').textContent = book.description;
        }
    }

    // Method to close the preview
    closePreview() {
        this.shadowRoot.querySelector('[data-list-active]').open = false;
    }
}

// Define the custom element
customElements.define('book-preview', BookPreview);
