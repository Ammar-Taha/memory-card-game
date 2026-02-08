import { getRemainingTries } from "../game/gameState.js";

/**
 * Updates the tries remaining display
 */
export function updateTriesDisplay() {
  const triesSpan = document.querySelector(".tries-remaining");
  if (triesSpan) {
    triesSpan.textContent = getRemainingTries();
  }
}

