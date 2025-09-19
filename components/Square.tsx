import React from 'react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  disabled: boolean;
  isWinning: boolean;
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


export const Square: React.FC<SquareProps> = ({ value, onClick, disabled, isWinning }) => {
    // Animate the icon's appearance. Winning squares get a slight size boost.
    const iconStyles = `w-1/2 h-1/2 transition-transform duration-300 ease-out transform ${value ? 'scale-100' : 'scale-0'} ${isWinning ? 'scale-110' : ''}`;
    const xColor = 'text-sky-500';
    const oColor = 'text-amber-500';
    
    return (
    <button
        onClick={onClick}
        disabled={disabled || value !== null}
        className={`group aspect-square w-full rounded-lg md:rounded-xl flex items-center justify-center 
                   bg-slate-200 dark:bg-slate-700 
                   hover:enabled:bg-slate-300 dark:hover:enabled:bg-slate-600 
                   disabled:opacity-70 disabled:cursor-not-allowed 
                   transition-all duration-200 transform 
                   hover:enabled:scale-105
                   focus:outline-none focus:ring-4 focus:ring-indigo-500/50
                   ${isWinning ? 'animate-win' : ''}`}
        data-value={value}
    >
        <span className="sr-only">{value}</span>
        {value === 'X' && <XIcon className={`${iconStyles} ${xColor} ${isWinning ? '!text-white' : ''}`} />}
        {value === 'O' && <OIcon className={`${iconStyles} ${oColor} ${isWinning ? '!text-white' : ''}`} />}
    </button>
  );
};