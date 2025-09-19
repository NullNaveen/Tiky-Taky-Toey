
import React from 'react';
import { GameStatusType, Player } from '../types';

interface GameStatusProps {
  status: GameStatusType;
  winner: Player | null;
  currentPlayer: Player;
}

const XIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10L42 42" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
        <path d="M42 10L10 42" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    </svg>
);

const OIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="18" stroke="currentColor" strokeWidth="8"/>
    </svg>
);


export const GameStatus: React.FC<GameStatusProps> = ({ status, winner, currentPlayer }) => {
  if (status !== 'playing') {
      let message: string;
      switch (status) {
        case 'won':
          message = winner === Player.Human ? '🎉 You Win!' : '🤖 AI Wins!';
          break;
        case 'draw':
          message = "It's a Draw!";
          break;
        default:
          message = 'Game Over';
      }
      return (
        <div className="mt-4 text-center h-16 flex items-center justify-center">
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                {message}
            </p>
        </div>
      );
  }

  return (
    <div className="mt-4 text-center h-16">
      <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {currentPlayer === Player.Human ? "Your Turn" : "AI's Turn"}
      </p>
      <div className="flex justify-center items-center gap-8">
        <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentPlayer === Player.Human ? 'opacity-100' : 'opacity-40 scale-90'}`}>
          <span className="text-sm font-bold text-sky-500">YOU</span>
          <div className={`p-1.5 rounded-full ${currentPlayer === Player.Human ? 'bg-indigo-100 dark:bg-indigo-900/50 animate-pulse-subtle' : ''}`}>
            <XIcon className="w-6 h-6 text-sky-500" />
          </div>
        </div>
        <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${currentPlayer === Player.AI ? 'opacity-100' : 'opacity-40 scale-90'}`}>
          <span className="text-sm font-bold text-amber-500">AI</span>
          <div className={`p-1.5 rounded-full ${currentPlayer === Player.AI ? 'bg-indigo-100 dark:bg-indigo-900/50 animate-pulse-subtle' : ''}`}>
            <OIcon className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
};