import "./index.css";
import { initGame, restartGame } from "./scripts/game/gameController.js";
import { setupCardFlip } from "./scripts/game/gameLogic.js";

// Initialize the game
initGame();
setupCardFlip(".card-grid", restartGame);
