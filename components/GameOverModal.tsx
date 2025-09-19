
import React from 'react';
import { Player } from '../types';

interface GameOverModalProps {
  isOpen: boolean;
  winner: Player | null;
  onPlayAgain: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, winner, onPlayAgain }) => {
  if (!isOpen) {
    return null;
  }

  let title = '';
  if (winner) {
    title = winner === Player.Human ? '🎉 You Won! 🎉' : 'You Lost!';
  } else {
    title = 'It\'s a Draw!';
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 animate-fade-in"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center w-full max-w-sm"
        style={{ animation: 'scaleUp 0.3s ease-out' }}
      >
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">{title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {winner === Player.Human ? "Excellent move! You've outsmarted the AI." : winner === Player.AI ? "The AI was too strong this time. Better luck next game!" : "A hard-fought battle ends in a stalemate."}
        </p>
        <button
          onClick={onPlayAgain}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};
