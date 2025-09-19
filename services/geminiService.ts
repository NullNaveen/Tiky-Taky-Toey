import { GoogleGenAI, Type } from "@google/genai";
import { Difficulty, SquareValue } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (difficulty: Difficulty, board: SquareValue[]): string => {
    const boardString = board.map(val => val || '-').join('');
    const availableMoves = board
        .map((val, idx) => (val === null ? idx : null))
        .filter(val => val !== null);

    // This case should ideally not be reached if the game logic is correct, but it's a safeguard.
    if (availableMoves.length === 0) {
        return "The game is over. There are no moves to make."
    }
    
    const promptCore = `
You are an expert Tic Tac Toe AI opponent. The current board is represented by a 9-character string: "${boardString}".
'X' is the human player, 'O' is you (the AI). The indices are 0-8 from top-left to bottom-right.
The available empty spots for your next move are at indices: [${availableMoves.join(', ')}].

Your task is to return your next move as a JSON object with a single key "move".
The value for "move" MUST be an integer chosen from the list of available indices.
`;

    switch (difficulty) {
        case Difficulty.Easy:
            return `${promptCore} Your difficulty is Easy. Choose a random valid move from the available spots.`;
        case Difficulty.Medium:
            return `${promptCore} Your difficulty is Medium.
1. First, check if you can win on this turn. If so, take that winning move from the available spots.
2. Second, check if the player 'X' can win on their next turn. If so, you must block them by choosing the correct spot from the available list.
3. Otherwise, choose the best strategic move from the available spots (center is best, then corners).`;
        case Difficulty.Hard:
            return `${promptCore} Your difficulty is Hard. You must play optimally to win or draw.
Analyze the available spots and choose the absolute best move using minimax principles. Never make a move that allows 'X' to win.`;
        default:
            return promptCore;
    }
};

export const getAIMove = async (board: SquareValue[], difficulty: Difficulty): Promise<number> => {
    try {
        const systemInstruction = getSystemInstruction(difficulty, board);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Based on the board state, what is your next move?",
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        move: {
                            type: Type.INTEGER,
                            description: 'The index (0-8) of the best move for O.',
                        },
                    },
                    required: ['move'],
                },
                temperature: difficulty === Difficulty.Easy ? 1.0 : 0.2, // Higher temp for more random 'Easy' moves
            },
        });

        const jsonString = response.text;
        const parsedResponse = JSON.parse(jsonString);
        
        const move = parsedResponse.move;

        if (typeof move === 'number' && move >= 0 && move <= 8 && board[move] === null) {
            return move;
        } else {
            console.error("Gemini returned an invalid move:", move, "Falling back to random.");
            // Fallback to a random valid move if API returns garbage
            const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
            return availableMoves[Math.floor(Math.random() * availableMoves.length)] as number;
        }
    } catch (error) {
        console.error("Error fetching AI move from Gemini API:", error);
        // Fallback to a random valid move on API error
        const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (availableMoves.length > 0) {
           return availableMoves[Math.floor(Math.random() * availableMoves.length)] as number;
        }
        return -1; // Should not happen in a real game
    }
};