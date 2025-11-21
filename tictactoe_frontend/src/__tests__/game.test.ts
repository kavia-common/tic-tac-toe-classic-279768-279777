import { calculateWinner, isDraw, nextPlayer } from "../../src/utils/game";
import { Board } from "../../src/types";

function b(cells: (string | null)[]): Board {
  return cells as Board;
}

describe("game utils", () => {
  it("detects winner rows", () => {
    const board = b(["X", "X", "X", null, null, null, null, null, null]);
    const { winner, line } = calculateWinner(board);
    expect(winner).toBe("X");
    expect(line).toEqual([0, 1, 2]);
  });

  it("detects winner diagonals", () => {
    const board = b(["O", null, null, null, "O", null, null, null, "O"]);
    const { winner, line } = calculateWinner(board);
    expect(winner).toBe("O");
    expect(line).toEqual([0, 4, 8]);
  });

  it("detects draw", () => {
    const board = b(["X", "O", "X", "X", "O", "O", "O", "X", "X"]);
    const { winner } = calculateWinner(board);
    expect(winner).toBeNull();
    expect(isDraw(board)).toBe(true);
  });

  it("nextPlayer toggles", () => {
    expect(nextPlayer("X")).toBe("O");
    expect(nextPlayer("O")).toBe("X");
  });
});
