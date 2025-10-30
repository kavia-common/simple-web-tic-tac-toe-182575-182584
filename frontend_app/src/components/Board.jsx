import React from 'react';
import Square from './Square';

/**
 * Board renders a 3x3 grid of Squares.
 * Props:
 * - squares: array(9) of 'X' | 'O' | null
 * - onPlay: (nextSquares, index) => void
 * - xIsNext: boolean
 * - winningLine: number[] (indices of winning squares)
 * - gameOver: boolean
 */
// PUBLIC_INTERFACE
export default function Board({ squares, onPlay, xIsNext, winningLine = [], gameOver }) {
  const handleClick = (i) => {
    if (gameOver || squares[i]) return;
    const next = squares.slice();
    onPlay(next, i);
  };

  const renderSquare = (i) => {
    const isWinning = winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
        disabled={gameOver || Boolean(squares[i])}
        isWinning={isWinning}
        ariaLabel={`Square ${i + 1}, ${squares[i] ? squares[i] : 'empty'}`}
      />
    );
  };

  return (
    <div className="board" role="grid" aria-label={`Tic Tac Toe board. ${xIsNext ? 'X' : 'O'} to move`}>
      {Array.from({ length: 3 }).map((_, row) => (
        <div className="board-row" role="row" key={row}>
          {Array.from({ length: 3 }).map((__, col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}
