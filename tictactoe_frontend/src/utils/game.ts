import { Board, Player, WIN_LINES } from "../types";

/**
 * PUBLIC_INTERFACE
 * Determines the winning player and winning line, if any.
 */
export function calculateWinner(board: Board): { winner: Player | null; line: number[] | null } {
  for (const [a, b, c] of WIN_LINES) {
    const va = board[a];
    if (va && va === board[b] && va === board[c]) {
      return { winner: va, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * PUBLIC_INTERFACE
 * Returns true if all cells are filled and no winner exists.
 */
export function isDraw(board: Board): boolean {
  return board.every((c) => c !== null);
}

/**
 * PUBLIC_INTERFACE
 * Returns the next player given the current one.
 */
export function nextPlayer(current: Player): Player {
  return current === "X" ? "O" : "X";
}

/**
 * Safely apply a move. Returns a new board, or the original if invalid.
 */
export function applyMove(board: Board, index: number, player: Player): Board {
  if (index < 0 || index >= board.length) return board;
  if (board[index] !== null) return board;
  const clone = board.slice();
  clone[index] = player;
  return clone;
}
