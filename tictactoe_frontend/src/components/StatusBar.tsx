import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Player } from "../types";
import { theme } from "../theme";

interface StatusBarProps {
  status: string;
  currentPlayer: Player;
  winner: Player | "Draw" | null;
}

/**
 * PUBLIC_INTERFACE
 * Displays current game status and player indicator.
 */
export const StatusBar: React.FC<StatusBarProps> = ({ status, currentPlayer, winner }) => {
  const isGameOver = winner !== null;
  return (
    <View style={styles.container} accessibilityRole="status" accessibilityLiveRegion="polite">
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Turn</Text>
        <Text style={[styles.badgeSymbol, currentPlayer === "X" ? styles.x : styles.o]}>{currentPlayer}</Text>
      </View>
      <Text style={[styles.status, isGameOver && styles.statusEnd]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 420,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadow.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  badgeText: {
    color: theme.colors.mutedText,
    marginRight: theme.spacing.sm,
    fontSize: 14,
  },
  badgeSymbol: {
    fontSize: 16,
    fontWeight: "800",
  },
  x: {
    color: theme.colors.x,
  },
  o: {
    color: theme.colors.o,
  },
  status: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: "700",
  },
  statusEnd: {
    color: theme.colors.primary,
  },
});
