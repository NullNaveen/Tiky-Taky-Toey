
export type SquareValue = 'X' | 'O' | null;

export enum Player {
    Human = 'X',
    AI = 'O',
}

export type GameStatusType = 'playing' | 'won' | 'draw';

export enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export interface GameStats {
  played: number;
  wins: number;   // Human wins
  losses: number; // AI wins
  draws: number;
}
