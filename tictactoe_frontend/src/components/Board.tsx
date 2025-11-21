import React from "react";
import { StyleSheet, View } from "react-native";
import { Board as BoardType } from "../types";
import { Cell } from "./Cell";
import { theme } from "../theme";

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  disabled?: boolean;
  winningLine: number[] | null;
}

/**
 * PUBLIC_INTERFACE
 * A 3x3 board for Tic Tac Toe.
 */
export const Board: React.FC<BoardProps> = ({ board, onCellPress, disabled = false, winningLine }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.grid} accessibilityRole="grid" accessibilityLabel="Tic Tac Toe board">
        {board.map((v, idx) => (
          <Cell
            key={idx}
            index={idx}
            value={v}
            onPress={onCellPress}
            disabled={disabled || v !== null}
            isWinning={!!winningLine?.includes(idx)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    maxWidth: 420,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    ...theme.shadow.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
