import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

interface ControlsProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  isGameOver: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Game controls for new game and undo actions.
 */
export const Controls: React.FC<ControlsProps> = ({ onReset, onUndo, canUndo, isGameOver }) => {
  return (
    <View style={styles.container} accessibilityRole="toolbar" accessibilityLabel="Game controls">
      <Pressable
        onPress={onReset}
        accessibilityRole="button"
        accessibilityLabel="Start a new game"
        style={({ pressed }) => [styles.buttonPrimary, pressed && styles.pressed]}
        android_ripple={{ color: theme.colors.border }}
      >
        <Text style={styles.buttonPrimaryText}>{isGameOver ? "New Game" : "Reset"}</Text>
      </Pressable>

      <Pressable
        onPress={onUndo}
        disabled={!canUndo}
        accessibilityRole="button"
        accessibilityLabel="Undo last move"
        accessibilityState={{ disabled: !canUndo }}
        style={({ pressed }) => [
          styles.buttonSecondary,
          !canUndo && styles.disabled,
          pressed && canUndo && styles.pressed,
        ]}
        android_ripple={{ color: theme.colors.border }}
      >
        <Text style={[styles.buttonSecondaryText, !canUndo && styles.disabledText]}>Undo</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
    width: "100%",
    maxWidth: 420,
  },
  buttonPrimary: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignItems: "center",
    ...theme.shadow.soft,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonSecondary: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.soft,
  },
  buttonSecondaryText: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  pressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.95,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: theme.colors.mutedText,
  },
});
