/**
 * Game state management
 */
export let cards = [];
export let remainingTries = 12;

/**
 * Resets the game state
 * @param {number} tries - Number of tries to reset to
 */
export function resetGameState(tries = 12) {
  remainingTries = tries;
  cards = [];
}

/**
 * Decrements remaining tries
 */
export function decrementTries() {
  remainingTries--;
}

/**
 * Gets remaining tries
 * @returns {number} Remaining tries
 */
export function getRemainingTries() {
  return remainingTries;
}

/**
 * Sets the cards array
 * @param {Array} newCards - New cards array
 */
export function setCards(newCards) {
  cards = newCards;
}

