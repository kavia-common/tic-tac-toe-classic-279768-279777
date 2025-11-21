export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = CellValue[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | "Draw" | null;
  winningLine: number[] | null;
  moves: number[]; // stack of indices for undo
  isGameOver: boolean;
}

export const BOARD_SIZE = 9;
export const GRID_DIM = 3;

export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
