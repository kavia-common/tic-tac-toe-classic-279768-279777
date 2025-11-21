# Tic Tac Toe - React Native (Expo)

A modern, accessible Tic Tac Toe app using the Ocean Professional theme.

Features:
- 3x3 board with touch interactions
- Two-player local play
- Turn indicator, status messages
- Win/draw detection with winning line highlight
- Controls: New Game/Reset and Undo
- Responsive layout, Expo compatibility

Run:
- npm install
- npm start (or npm run web / ios / android)

CI/Build:
- Native Android/iOS builds are skipped in this CI. A no-op gradle wrapper is provided to prevent failures.
- For previews, use npm run web (served by Expo, defaults to port 3000).

Tests:
- npm run test

Environment:
- Uses only EXPO_PUBLIC_* env vars if needed. No secrets are required.
