export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    mutedText: "#4B5563",
    border: "#E5E7EB",
    shadow: "#11182714",
    x: "#2563EB",
    o: "#F59E0B",
    winningHighlight: "#DCFCE7",
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  shadow: {
    card: {
      shadowColor: "#111827",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    soft: {
      shadowColor: "#111827",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
  },
} as const;

export type Theme = typeof theme;
