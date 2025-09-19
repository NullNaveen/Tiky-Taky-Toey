
import { useState, useEffect, useCallback } from 'react';
import { SquareValue, Player, GameStatusType, Difficulty, GameStats } from '../types';
import { WINNING_COMBINATIONS, INITIAL_BOARD, PLAYERS } from '../constants';
import { getAIMove } from '../services/geminiService';

const STATS_STORAGE_KEY = 'tic-tac-toe-stats';

const getStatsFromStorage = (): GameStats => {
  try {
    const storedStats = localStorage.getItem(STATS_STORAGE_KEY);
    if (storedStats) {
      return JSON.parse(storedStats);
    }
  } catch (error) {
    console.error("Could not parse stats from localStorage", error);
  }
  return { played: 0, wins: 0, losses: 0, draws: 0 };
};

const saveStatsToStorage = (stats: GameStats) => {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Could not save stats to localStorage", error);
  }
};

const calculateWinner = (board: SquareValue[]): { winner: Player | null; line: number[] | null } => {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: WINNING_COMBINATIONS[i] };
    }
  }
  return { winner: null, line: null };
};

export const useTicTacToe = (difficulty: Difficulty) => {
  const [board, setBoard] = useState<SquareValue[]>(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYERS.HUMAN);
  const [status, setStatus] = useState<GameStatusType>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [stats, setStats] = useState<GameStats>(() => getStatsFromStorage());

  const checkGameState = useCallback((currentBoard: SquareValue[]) => {
    const { winner: newWinner, line } = calculateWinner(currentBoard);
    if (newWinner) {
      setStatus('won');
      setWinner(newWinner);
      setWinningLine(line);
    } else if (currentBoard.every(square => square !== null)) {
      setStatus('draw');
    }
  }, []);

  useEffect(() => {
    if (status === 'won' || status === 'draw') {
      setStats(prevStats => {
        const newStats: GameStats = {
          ...prevStats,
          played: prevStats.played + 1,
          wins: status === 'won' && winner === PLAYERS.HUMAN ? prevStats.wins + 1 : prevStats.wins,
          losses: status === 'won' && winner === PLAYERS.AI ? prevStats.losses + 1 : prevStats.losses,
          draws: status === 'draw' ? prevStats.draws + 1 : prevStats.draws,
        };
        saveStatsToStorage(newStats);
        return newStats;
      });
    }
  }, [status, winner]);

  const handleSquareClick = useCallback((index: number) => {
    if (board[index] || status !== 'playing' || currentPlayer !== PLAYERS.HUMAN) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = PLAYERS.HUMAN;
    setBoard(newBoard);
    const gameState = calculateWinner(newBoard);
    if (gameState.winner || newBoard.every(s => s !== null)) {
      checkGameState(newBoard);
    } else {
      setCurrentPlayer(PLAYERS.AI);
    }
  }, [board, status, currentPlayer, checkGameState]);
  
  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(PLAYERS.HUMAN);
    setStatus('playing');
    setWinner(null);
    setWinningLine(null);
    setIsThinking(false);
  }, []);

  const resetStats = useCallback(() => {
    const initialStats: GameStats = { played: 0, wins: 0, losses: 0, draws: 0 };
    saveStatsToStorage(initialStats);
    setStats(initialStats);
  }, []);

  useEffect(() => {
    if (status === 'playing' && currentPlayer === PLAYERS.AI) {
      setIsThinking(true);
      const makeAIMove = async () => {
        // Add a slight delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        const aiMoveIndex = await getAIMove(board, difficulty);
        if (aiMoveIndex !== -1 && board[aiMoveIndex] === null) {
          const newBoard = [...board];
          newBoard[aiMoveIndex] = PLAYERS.AI;
          setBoard(newBoard);
          checkGameState(newBoard);
          setCurrentPlayer(PLAYERS.HUMAN);
        } else if (aiMoveIndex === -1) {
          // Handle case where AI service fails and returns -1
          // This might happen if there are no available moves, which checkGameState should handle
          checkGameState(board);
        }
        setIsThinking(false);
      };
      makeAIMove();
    }
  }, [currentPlayer, status, difficulty, checkGameState, board]);

  return {
    board,
    status,
    winner,
    winningLine,
    isAITurn: currentPlayer === PLAYERS.AI,
    isThinking,
    currentPlayer,
    stats,
    handleSquareClick,
    resetGame,
    resetStats,
  };
};
