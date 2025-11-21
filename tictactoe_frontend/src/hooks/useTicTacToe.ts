import { useCallback, useMemo, useState } from "react";
import { Board, GameState, Player, BOARD_SIZE, CellValue } from "../types";
import { applyMove, calculateWinner, isDraw, nextPlayer } from "../utils/game";

/**
 * PUBLIC_INTERFACE
 * Hook that manages Tic Tac Toe game state and actions.
 */
export function useTicTacToe(initialPlayer: Player = "X") {
  const [state, setState] = useState<GameState>(() => ({
    board: Array<CellValue>(BOARD_SIZE).fill(null) as Board,
    currentPlayer: initialPlayer,
    winner: null,
    winningLine: null,
    moves: [],
    isGameOver: false,
  }));

  const makeMove = useCallback(
    (index: number) => {
      setState((prev) => {
        if (prev.isGameOver) return prev;
        if (index < 0 || index >= prev.board.length) return prev;
        if (prev.board[index] !== null) return prev;

        const newBoard = applyMove(prev.board, index, prev.currentPlayer);
        const { winner, line } = calculateWinner(newBoard);

        if (winner) {
          return {
            ...prev,
            board: newBoard,
            winner,
            winningLine: line,
            isGameOver: true,
            moves: [...prev.moves, index],
          };
        }

        if (isDraw(newBoard)) {
          return {
            ...prev,
            board: newBoard,
            winner: "Draw",
            winningLine: null,
            isGameOver: true,
            moves: [...prev.moves, index],
          };
        }

        return {
          ...prev,
          board: newBoard,
          currentPlayer: nextPlayer(prev.currentPlayer),
          moves: [...prev.moves, index],
        };
      });
    },
    [setState]
  );

  const reset = useCallback(() => {
    setState((prev) => ({
      board: Array<CellValue>(BOARD_SIZE).fill(null) as Board,
      currentPlayer: prev.currentPlayer === "X" ? "O" : "X", // alternate who starts
      winner: null,
      winningLine: null,
      moves: [],
      isGameOver: false,
    }));
  }, []);

  const undo = useCallback(() => {
    setState((prev) => {
      const moves = prev.moves.slice();
      const last = moves.pop();
      if (last === undefined) return prev;

      const nextBoard = prev.board.slice();
      nextBoard[last] = null;

      const { winner, line } = calculateWinner(nextBoard);
      const over = winner !== null ? true : isDraw(nextBoard);

      return {
        board: nextBoard,
        currentPlayer: nextPlayer(prev.currentPlayer),
        winner: over ? winner ?? "Draw" : null,
        winningLine: line,
        moves,
        isGameOver: over,
      };
    });
  }, []);

  const status = useMemo(() => {
    if (state.winner && state.winner !== "Draw") {
      return `Player ${state.winner} wins!`;
    }
    if (state.winner === "Draw") {
      return "It's a draw.";
    }
    return `Player ${state.currentPlayer}'s turn`;
  }, [state.currentPlayer, state.winner]);

  return {
    state,
    status,
    actions: {
      makeMove,
      reset,
      undo,
    },
  };
}
