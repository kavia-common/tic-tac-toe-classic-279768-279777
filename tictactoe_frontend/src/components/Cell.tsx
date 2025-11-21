import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CellValue } from "../types";
import { theme } from "../theme";

interface CellProps {
  index: number;
  value: CellValue;
  onPress: (index: number) => void;
  disabled?: boolean;
  isWinning?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * A single cell in the Tic Tac Toe board.
 */
const CellComponent: React.FC<CellProps> = ({ index, value, onPress, disabled = false, isWinning = false }) => {
  const handlePress = () => {
    try {
      if (!disabled) {
        onPress(index);
      }
    } catch {
      // Swallow to avoid crashing UI; upstream hook validates gracefully
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`Cell ${index + 1}`}
      accessibilityState={{ disabled, selected: !!value }}
      style={({ pressed }) => [
        styles.cell,
        isWinning && styles.cellWinning,
        pressed && styles.cellPressed,
        disabled && styles.cellDisabled,
      ]}
      android_ripple={{ color: theme.colors.border }}
    >
      <View style={styles.inner}>
        <Text
          style={[
            styles.symbol,
            value === "X" ? styles.symbolX : undefined,
            value === "O" ? styles.symbolO : undefined,
          ]}
        >
          {value ?? ""}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    margin: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow.soft,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
  },
  cellPressed: {
    transform: [{ scale: 0.98 }],
  },
  cellDisabled: {
    opacity: 0.8,
  },
  cellWinning: {
    backgroundColor: theme.colors.winningHighlight,
    borderColor: theme.colors.success,
  },
  symbol: {
    fontSize: 40,
    fontWeight: "800",
    color: theme.colors.text,
  },
  symbolX: {
    color: theme.colors.x,
  },
  symbolO: {
    color: theme.colors.o,
  },
});

export const Cell = memo(CellComponent);
