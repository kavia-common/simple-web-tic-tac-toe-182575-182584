import React from 'react';

/**
 * Square renders an interactive button for a single cell.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - disabled: boolean
 * - isWinning: boolean
 * - ariaLabel: string
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, isWinning, ariaLabel }) {
  return (
    <button
      type="button"
      className={`square ${isWinning ? 'square-win' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span className={`mark ${value === 'X' ? 'mark-x' : value === 'O' ? 'mark-o' : ''}`}>
        {value}
      </span>
    </button>
  );
}
