import {
  getRemainingTries,
  decrementTries,
} from "./gameState.js";
import { createConfetti } from "../utils/confetti.js";
import { updateTriesDisplay } from "../ui/display.js";
import { notyf } from "../ui/notifications.js";

/**
 * Checks if the user has won (all cards are matched)
 * @returns {boolean} True if all cards are matched
 */
export function checkWin() {
  const allCards = document.querySelectorAll(".card");
  const matchedCards = document.querySelectorAll(".card.matched");
  return allCards.length > 0 && allCards.length === matchedCards.length;
}

/**
 * Handles a successful match
 * @param {HTMLElement} firstCard - First matched card
 * @param {HTMLElement} secondCard - Second matched card
 * @param {Function} restartGame - Function to restart the game
 */
function handleMatch(firstCard, secondCard, restartGame) {
  if (firstCard && secondCard) {
    // Add matched class - CSS will handle the background color change
    [firstCard, secondCard].forEach((card) => {
      card.classList.add("matched");
    });
  }

  // Check if user won
  if (checkWin()) {
    createConfetti();
    notyf.success("Congratulations! You won!");
    setTimeout(() => {
      notyf.open({
        type: "warning",
        message: "Game is about to restart...",
        duration: 2000,
      });
      setTimeout(() => {
        restartGame();
      }, 2500);
    }, 3000);
  }
}

/**
 * Handles a failed match
 * @param {HTMLElement} firstCard - First card that didn't match
 * @param {HTMLElement} secondCard - Second card that didn't match
 * @param {Function} restartGame - Function to restart the game
 */
function handleMismatch(firstCard, secondCard, restartGame) {
  decrementTries();
  updateTriesDisplay();

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    // Check if game is over
    if (getRemainingTries() <= 0) {
      notyf.error("Game Over! You've run out of attempts.");
      // Show warning before restart
      setTimeout(() => {
        notyf.open({
          type: "warning",
          message: "Game is about to restart...",
          duration: 2000,
        });
        setTimeout(() => {
          restartGame();
        }, 2500);
      }, 2000);
    }
  }, 1000);
}

/**
 * Sets up card flip event listeners and game logic
 * @param {string} containerSelector - CSS selector for the card container
 * @param {Function} restartGame - Function to restart the game
 */
export function setupCardFlip(containerSelector, restartGame) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let flippedCards = [];

  container.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;

    // Don't allow clicking if no tries remaining
    if (getRemainingTries() <= 0) return;

    // Don't allow clicking if card is already flipped or matched
    if (
      card.classList.contains("flipped") ||
      card.classList.contains("matched")
    )
      return;

    // Don't allow clicking if 2 cards are already flipped
    if (flippedCards.length >= 2) return;

    // Flip the card
    card.classList.add("flipped");
    flippedCards.push(card);

    // If 2 cards are flipped, check for match
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const firstName = firstCard.getAttribute("data-name");
      const secondName = secondCard.getAttribute("data-name");

      if (firstName === secondName) {
        // Match found - wait for flip transition to complete, then animate
        setTimeout(() => {
          handleMatch(firstCard, secondCard, restartGame);
          flippedCards = [];
        }, 300); // Wait for the 0.3s flip transition to complete
      } else {
        // No match - flip them back after a delay
        handleMismatch(firstCard, secondCard, restartGame);
        flippedCards = [];
      }
    }
  });
}

