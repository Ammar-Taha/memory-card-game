import { processCards, renderCards } from "../utils/cards.js";
import {
  resetGameState,
  setCards,
} from "./gameState.js";
import { updateTriesDisplay } from "../ui/display.js";

/**
 * Restarts the game
 */
export function restartGame() {
  // Reset tries
  resetGameState(12);
  updateTriesDisplay();

  // Clear the card grid
  const container = document.querySelector(".card-grid");
  if (container) {
    container.innerHTML = "";
  }

  // Process and render new cards
  const newCards = processCards();
  setCards(newCards);
  renderCards(newCards, ".card-grid");
}

/**
 * Initializes the game
 */
export function initGame() {
  const newCards = processCards();
  setCards(newCards);
  renderCards(newCards, ".card-grid");
  updateTriesDisplay();
}

