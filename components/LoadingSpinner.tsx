import React from 'react';

const OIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="18" stroke="currentColor" strokeWidth="8"/>
    </svg>
);

export const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
    <OIcon className="w-14 h-14 text-amber-500 animate-thinking-pulse" />
    <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-400 flex items-center">
      <span>AI is thinking</span>
      <span className="animate-dot-1 ml-1">.</span>
      <span className="animate-dot-2">.</span>
      <span className="animate-dot-3">.</span>
    </p>
  </div>
);