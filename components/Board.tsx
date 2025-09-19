
import React from 'react';
import { Square } from './Square';
import { SquareValue } from '../types';

interface BoardProps {
  board: SquareValue[];
  onSquareClick: (index: number) => void;
  disabled: boolean;
  winningLine: number[] | null;
}

export const Board: React.FC<BoardProps> = ({ board, onSquareClick, disabled, winningLine }) => {
  return (
    <div className={`grid grid-cols-3 gap-3 md:gap-4 my-6 ${disabled ? 'cursor-not-allowed' : ''}`}>
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={disabled}
          isWinning={winningLine?.includes(index) ?? false}
        />
      ))}
    </div>
  );
};
