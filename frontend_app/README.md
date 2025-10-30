# Tic Tac Toe – React (Frontend Only)

A simple, modern, responsive Tic Tac Toe game built with React. Two players share the same device—no backend required.

## Features
- 3x3 board with clickable squares
- Alternating turns, X starts
- Winner and draw detection
- Prevents further moves after game ends
- Reset / New Game button
- Move history with time-travel
- Responsive layout for mobile and desktop
- Accessible buttons and focus states
- Modern light UI using:
  - primary: `#3b82f6`
  - success: `#06b6d4`
  - background: `#f9fafb`
  - surface: `#ffffff`
  - text: `#111827`

## Getting Started
From the `frontend_app` directory:

```bash
npm install
npm start
```

The app will run at http://localhost:3000.

## Project Structure
- `src/App.js` – App container and game logic
- `src/components/Board.jsx` – 3x3 board
- `src/components/Square.jsx` – individual square
- `src/components/Controls.jsx` – status, reset, and move history
- `src/styles.css` – modern light theme styles

## Notes
- No environment variables required.
- No external services or backend used.
