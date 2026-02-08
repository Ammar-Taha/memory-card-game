import { shuffle } from "./shuffle.js";
import cardsInfo from "../../cards_info.json";

/**
 * Processes cards: converts image paths to absolute URLs, duplicates for pairs, and shuffles
 * @returns {Array} Processed and shuffled cards
 */
export function processCards() {
  try {
    // Use Vite's base URL so assets work in dev and production (e.g. GitHub Pages)
    const base = (import.meta.env.BASE_URL || "/").replace(/([^/])$/, "$1/");
    const assetsBase = `${base}assets/images/`;

    const processedCards = cardsInfo.map((card) => {
      const filename = card.image.replace(/^.*\//, "");
      return {
        ...card,
        image: `${assetsBase}${filename}`,
      };
    });
    // Duplicate each card to create pairs for the memory game
    const duplicatedCards = [...processedCards, ...processedCards];
    // Shuffle the cards using Fisher-Yates algorithm
    return shuffle(duplicatedCards);
  } catch (error) {
    console.error("Error processing cards:", error);
    return [];
  }
}

/**
 * Creates a card DOM element
 * @param {Object} card - Card data object
 * @param {string} coverImage - URL of the cover image
 * @returns {HTMLElement} Card element
 */
export function createCardElement(card, coverImage) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.setAttribute("data-name", card.name);
  cardElement.innerHTML = `
    <div class="card-back">
      <img class="card-back-image" src="${card.image}" alt="${card.name}" />
    </div>
    <div class="card-face">
      <img class="card-face-image" src="${coverImage}" alt="" />
    </div>
  `;
  return cardElement;
}

/**
 * Gets the cover image URL (public/assets/images/ - served at base in production)
 */
function getCoverImageUrl() {
  const base = (import.meta.env.BASE_URL || "/").replace(/([^/])$/, "$1/");
  return `${base}assets/images/cover.svg`;
}

/**
 * Renders cards to the DOM
 * @param {Array} cards - Array of card objects
 * @param {string} containerSelector - CSS selector for the container
 */
export function renderCards(cards, containerSelector) {
  const coverImage = getCoverImageUrl();
  const cardsFragment = document.createDocumentFragment();

  cards.forEach((card) => {
    const cardElement = createCardElement(card, coverImage);
    cardsFragment.appendChild(cardElement);
  });

  const container = document.querySelector(containerSelector);
  if (container) {
    container.appendChild(cardsFragment);
  }
}
