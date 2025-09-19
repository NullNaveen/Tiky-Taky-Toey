
import React from 'react';
import { Difficulty, GameStats } from '../types';

interface SettingsPanelProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  stats: GameStats;
  onResetStats: () => void;
}

const SunIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const StatItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
        <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{value}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
);


export const SettingsPanel: React.FC<SettingsPanelProps> = ({ difficulty, onDifficultyChange, theme, onThemeChange, stats, onResetStats }) => {
  const difficulties = Object.values(Difficulty);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Difficulty</label>
          <div className="flex w-full bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => onDifficultyChange(level)}
                className={`flex-1 px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-300
                  ${difficulty === level 
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 sm:hidden">Theme</label>
          <button
              onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
              <span className="sr-only">Toggle theme</span>
              {theme === 'light' ? <MoonIcon className="w-5 h-5"/> : <SunIcon className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Statistics</h3>
            <button 
              onClick={onResetStats}
              className="text-xs font-semibold text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded"
            >
              Reset
            </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <StatItem label="Played" value={stats.played} />
            <StatItem label="Wins" value={stats.wins} />
            <StatItem label="Losses" value={stats.losses} />
            <StatItem label="Draws" value={stats.draws} />
        </div>
      </div>
    </div>
  );
};
