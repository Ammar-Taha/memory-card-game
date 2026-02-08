# 🃏 Memory Card Game

A browser-based memory-matching game built with vanilla JavaScript, featuring a modular architecture, limited-attempt gameplay, card flip animations, and toast notifications with confetti on win.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](#)
[![Live Preview](https://img.shields.io/badge/Live_Preview-Demo-green?logo=github-pages)](#)

## 🌐 Live Preview

Experience the game in action: **[View Live Demo](#)** *(add your GitHub Pages URL when the repo is published)*

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [App Logic & Workflow](#-app-logic--workflow)
- [Module Architecture](#-module-architecture)
- [Getting Started](#-getting-started)
- [Technologies Used](#-technologies-used)
- [Project Architecture](#-project-architecture)

## ✨ Features

### Core Functionality
- **Card Flip Gameplay**: Click cards to reveal symbols; find matching pairs to win
- **Limited Attempts**: Fixed number of tries (default 12); game over when attempts run out
- **Attempts Display**: Live counter showing remaining attempts in the header
- **Win Detection**: All pairs matched triggers win state with celebration
- **Auto-Restart**: Game restarts automatically after win or game over (with short delay and notification)

### User Experience
- **Flip Animations**: CSS-driven 3D flip transition when revealing cards
- **Match Feedback**: Matched pairs stay revealed with distinct styling
- **Mismatch Feedback**: Non-matching pairs flip back after a short delay
- **Toast Notifications**: Success message and confetti on win; error message on game over; warning before restart
- **Confetti Effect**: Visual celebration when the player wins

### Technical
- **Shuffled Deck**: Cards shuffled with Fisher-Yates algorithm for a random layout each game
- **Card Data from JSON**: Symbol set and image paths defined in `cards_info.json` for easy customization
- **Modular JavaScript**: Separate modules for game state, logic, controller, UI, and utilities

### Accessibility
- **Semantic HTML**: Clear structure with header, section, and status text
- **ARIA / Status**: Attempts counter uses `role="status"` for live updates
- **Alt Text**: Card images include descriptive `alt` attributes

## 📁 Project Structure

```
Memory Card Game/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── assets/
│   └── images/               # Card face and cover SVGs
├── src/
│   ├── cards_info.json       # Card definitions (name, image path)
│   ├── index.css             # CSS entry point
│   ├── main.js               # Application entry point
│   ├── scripts/
│   │   ├── game/
│   │   │   ├── gameController.js   # Init and restart
│   │   │   ├── gameLogic.js        # Flip, match, mismatch, win
│   │   │   └── gameState.js        # Cards array, remaining tries
│   │   ├── ui/
│   │   │   ├── display.js          # Tries display update
│   │   │   └── notifications.js    # Notyf setup
│   │   └── utils/
│   │       ├── cards.js            # Process, create, render cards
│   │       ├── confetti.js         # Win celebration
│   │       └── shuffle.js          # Fisher-Yates shuffle
│   └── styles/
│       ├── modern-css-reset.css
│       └── style.css
├── index.html
├── package.json
├── vite.config.js
├── features.md                # Future feature ideas
└── README.md
```

## 🔄 App Logic & Workflow

### Initialization Flow

1. **Entry Point** (`main.js`): Imports styles, calls `initGame()`, then `setupCardFlip()` with restart callback
2. **Init Game** (`gameController.js`): Processes cards from JSON (duplicate for pairs, shuffle), stores in state, renders grid, updates tries display
3. **Card Flip Setup** (`gameLogic.js`): Attaches click listener to card grid; handles flip, match check, and try decrement

### Gameplay Flow

1. **User Clicks a Card**:
   - Ignored if: no tries left, card already flipped/matched, or two cards already face-up
   - Card gets `flipped` class (CSS reveals face)
   - Card is pushed to `flippedCards` array

2. **When Two Cards Are Flipped**:
   - Compare `data-name` on both cards
   - **Match**: Add `matched` class to both; clear `flippedCards`; if all cards matched → trigger win
   - **Mismatch**: Decrement `remainingTries`, update display; after delay remove `flipped` from both; clear `flippedCards`; if tries ≤ 0 → game over

### Win Flow

1. **All Pairs Matched**:
   - Confetti runs
   - Success toast: "Congratulations! You won!"
   - Warning toast: "Game is about to restart..."
   - After delay, `restartGame()` is called

### Game Over Flow

1. **No Tries Left** (after a mismatch):
   - Error toast: "Game Over! You've run out of attempts."
   - Warning toast, then `restartGame()` after delay

### Restart Flow

1. **restartGame()** (in `gameController.js`):
   - Reset `remainingTries` (e.g. 12)
   - Update tries display
   - Clear card grid DOM
   - Process new cards (shuffle again), set state, render new grid

## 🏗️ Module Architecture

### Core Modules

#### [`gameState.js`](src/scripts/game/gameState.js) – State Management
- **Purpose**: Holds game data and try count
- **Exports**:
  - `cards`: Array of current card objects
  - `remainingTries`: Attempts left
  - `resetGameState(tries)`: Reset tries and clear cards
  - `decrementTries()`, `getRemainingTries()`, `setCards(newCards)`

#### [`gameController.js`](src/scripts/game/gameController.js) – Init & Restart
- **Purpose**: Bootstrap and reset the game
- **Exports**:
  - `initGame()`: Process cards, set state, render grid, update tries display
  - `restartGame()`: Reset state, clear grid, process and render new cards

#### [`gameLogic.js`](src/scripts/game/gameLogic.js) – Game Rules & Input
- **Purpose**: Card flip behavior, match/mismatch handling, win/game over
- **Exports**:
  - `setupCardFlip(containerSelector, restartGame)`: Click handling, flip state, match check
  - `checkWin()`: Returns whether all cards have `matched` class
- **Internal**: `handleMatch()`, `handleMismatch()` (feedback, confetti, toasts, restart scheduling)

#### [`display.js`](src/scripts/ui/display.js) – UI Updates
- **Purpose**: Sync UI with state
- **Exports**: `updateTriesDisplay()` – sets `.tries-remaining` from `getRemainingTries()`

#### [`notifications.js`](src/scripts/ui/notifications.js) – Toasts
- **Purpose**: Notyf instance for success, error, and warning messages
- **Exports**: `notyf`

#### [`cards.js`](src/scripts/utils/cards.js) – Card Data & DOM
- **Purpose**: Load, process, and render cards
- **Exports**:
  - `processCards()`: Load `cards_info.json`, build full image URLs, duplicate for pairs, shuffle
  - `createCardElement(card, coverImage)`: Build single card DOM node with back/face and `data-name`
  - `renderCards(cards, containerSelector)`: Append card elements to grid

#### [`shuffle.js`](src/scripts/utils/shuffle.js) – Shuffle
- **Purpose**: Randomize card order
- **Exports**: `shuffle(array)` – Fisher-Yates in-place shuffle

#### [`confetti.js`](src/scripts/utils/confetti.js) – Celebration
- **Purpose**: Run confetti animation on win
- **Exports**: `createConfetti()`

#### [`main.js`](src/main.js) – Entry Point
- **Purpose**: Load CSS, init game, attach card flip logic with restart callback

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (when available):
   ```bash
   git clone <your-repo-url>
   cd memory-card-game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser** at the URL shown (e.g. `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

Push to the `main` branch (or trigger the workflow manually). The `.github/workflows/deploy.yml` workflow builds and deploys the `dist` folder to GitHub Pages.

## 🛠️ Technologies Used

- **Vanilla JavaScript (ES6+)**: No frameworks; ES modules for structure
- **HTML5**: Semantic markup, `role="status"` for live region
- **CSS3**: Custom properties, Grid layout, 3D transforms for card flip, modern reset
- **Vite**: Build tool and dev server
- **Notyf**: Lightweight toast notifications
- **Normalize.css**: Cross-browser baseline styles

## 🎨 Project Architecture

### CSS Architecture

- **Reset**: `modern-css-reset.css` for consistent baseline
- **App**: `style.css` for layout, card grid, flip animation, and matched state
- **Entry**: `index.css` imports layers/reset and app styles

### JavaScript Architecture

- **Modular design**: One concern per file (state, controller, logic, UI, utils)
- **ES modules**: Clear imports/exports and dependency flow
- **State in one place**: `gameState.js` for cards and tries
- **Event-driven**: Single delegated click on card grid; logic in `gameLogic.js`

### Data Flow

```
User Click → gameLogic (flip / match / mismatch) → gameState update → display update → optional restart
```

### Key Design Patterns

- **Module pattern**: Encapsulated logic per script
- **Delegated events**: One listener on `.card-grid`, target checked with `.closest('.card')`
- **Data attributes**: `data-name` on cards for match comparison without extra state
- **Callback injection**: `restartGame` passed into `setupCardFlip` for win/game-over flow
