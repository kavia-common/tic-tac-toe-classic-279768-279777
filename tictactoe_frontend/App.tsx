import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { theme } from "./src/theme";
import { useTicTacToe } from "./src/hooks/useTicTacToe";
import { StatusBar as StatusPanel } from "./src/components/StatusBar";
import { Board } from "./src/components/Board";
import { Controls } from "./src/components/Controls";

export default function App() {
  const { state, status, actions } = useTicTacToe("X");

  return (
    <SafeAreaView style={styles.safe} >
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            Tic Tac Toe
          </Text>
          <Text style={styles.subtitle}>Ocean Professional</Text>
        </View>

        <StatusPanel status={status} currentPlayer={state.currentPlayer} winner={state.winner} />

        <Board
          board={state.board}
          onCellPress={actions.makeMove}
          disabled={state.isGameOver}
          winningLine={state.winningLine}
        />

        <Controls
          onReset={actions.reset}
          onUndo={actions.undo}
          canUndo={state.moves.length > 0 && !state.isGameOver}
          isGameOver={state.isGameOver}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText} accessibilityHint="Game instructions">
            Tap a square to place your mark. Get three in a row to win.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  header: {
    width: "100%",
    maxWidth: 420,
    alignItems: "flex-start",
    paddingHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.mutedText,
  },
  footer: {
    marginTop: "auto",
    width: "100%",
    maxWidth: 420,
    paddingHorizontal: theme.spacing.md,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.mutedText,
  },
});
