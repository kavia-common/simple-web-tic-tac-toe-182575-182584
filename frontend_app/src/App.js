import React, { useMemo, useState } from 'react';
import './styles.css';
import Board from './components/Board';
import Controls from './components/Controls';

// Helpers
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diags
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

// PUBLIC_INTERFACE
export default function App() {
  /** Main Tic Tac Toe application (no backend required).
   * Renders a 3x3 board, manages turns, detects wins/draws,
   * supports optional time-travel via move history, and provides reset.
   */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0); // index into history
  const currentSquares = history[currentStep];
  const xIsNext = currentStep % 2 === 0;

  const result = useMemo(() => calculateWinner(currentSquares), [currentSquares]);
  const movesPlayed = currentSquares.filter(Boolean).length;
  const isDraw = !result.winner && movesPlayed === 9;

  const status = result.winner
    ? `Winner: ${result.winner}`
    : isDraw
      ? 'Draw'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handlePlay(nextSquares, clickedIndex) {
    if (result.winner || isDraw || currentSquares[clickedIndex]) return;
    const value = xIsNext ? 'X' : 'O';
    const updated = nextSquares.slice();
    updated[clickedIndex] = value;

    // Truncate any "future" moves if time-traveled
    const nextHistory = [...history.slice(0, currentStep + 1), updated];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
  }

  // PUBLIC_INTERFACE
  function jumpTo(step) {
    /** Jump to a previous move in history (time-travel). */
    setCurrentStep(step);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    /** Reset the game to an empty board and initial state. */
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  return (
    <div className="app-root" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <main className="container">
        <header className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle" aria-live="polite">{status}</p>
        </header>

        <section className="game-section">
          <Board
            squares={currentSquares}
            onPlay={handlePlay}
            xIsNext={xIsNext}
            winningLine={result.line}
            gameOver={Boolean(result.winner) || isDraw}
          />
          <Controls
            status={status}
            onReset={resetGame}
            history={history}
            currentStep={currentStep}
            onJumpTo={jumpTo}
          />
        </section>

        <footer className="footer">
          <small>Built with React · No backend · Modern light UI</small>
        </footer>
      </main>
    </div>
  );
}
