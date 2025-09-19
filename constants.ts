import { Player, SquareValue } from './types';

export const PLAYERS: { [key: string]: Player } = {
  HUMAN: Player.Human,
  AI: Player.AI,
};

export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const INITIAL_BOARD: SquareValue[] = Array(9).fill(null);
