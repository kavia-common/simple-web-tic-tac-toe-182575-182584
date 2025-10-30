import React from 'react';

/**
 * Controls render the status, reset button, and move history for time-travel.
 * Props:
 * - status: string
 * - onReset: () => void
 * - history: Array of board states
 * - currentStep: number
 * - onJumpTo: (step: number) => void
 */
// PUBLIC_INTERFACE
export default function Controls({ status, onReset, history = [], currentStep, onJumpTo }) {
  return (
    <aside className="controls" aria-label="Game controls">
      <div className="panel">
        <div className="status">
          <span className="badge">{status}</span>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-primary" onClick={onReset} aria-label="Reset game">
            New Game
          </button>
        </div>
      </div>

      <div className="history">
        <div className="history-header">Move History</div>
        <ol className="history-list">
          {history.map((_, step) => {
            const desc = step === 0 ? 'Go to start' : `Go to move #${step}`;
            const isCurrent = step === currentStep;
            return (
              <li key={step}>
                <button
                  type="button"
                  className={`btn btn-ghost ${isCurrent ? 'active' : ''}`}
                  onClick={() => onJumpTo(step)}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {desc}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
