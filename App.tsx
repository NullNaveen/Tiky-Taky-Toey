
import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { SettingsPanel } from './components/SettingsPanel';
import { GameOverModal } from './components/GameOverModal';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Player, Difficulty } from './types';
import { LoadingSpinner } from './components/LoadingSpinner';

// Fix: Moved GitHubIcon component from constants.ts to App.tsx to resolve JSX parsing issues in a .ts file.
const GitHubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const {
    board,
    status,
    winner,
    winningLine,
    isAITurn,
    isThinking,
    currentPlayer,
    stats,
    handleSquareClick,
    resetGame,
    resetStats,
  } = useTicTacToe(difficulty);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleReset = useCallback(() => {
    resetGame();
  }, [resetGame]);
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <div className="absolute top-4 right-4">
        <a href="https://github.com/google/genai-js" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <GitHubIcon />
        </a>
      </div>
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
          Gemini Tic Tac Toe
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Can you beat the Gemini-powered AI?
        </p>
      </header>

      <main className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">
        <SettingsPanel
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
          theme={theme}
          onThemeChange={setTheme}
          stats={stats}
          onResetStats={resetStats}
        />
        <div className="relative">
          {isThinking && <LoadingSpinner />}
          <Board
            board={board}
            onSquareClick={handleSquareClick}
            disabled={status !== 'playing' || isAITurn}
            winningLine={winningLine}
          />
        </div>
        <GameStatus status={status} winner={winner} currentPlayer={currentPlayer} />
      </main>

      <GameOverModal
        isOpen={status !== 'playing'}
        winner={winner}
        onPlayAgain={handleReset}
      />
      
      <footer className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} - Built with React, Tailwind CSS, and Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
