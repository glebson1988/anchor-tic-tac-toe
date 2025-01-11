# Tic-Tac-Toe on Solana with Anchor

This project implements a **Tic-Tac-Toe** game on the Solana blockchain using the **Anchor framework**. The game demonstrates fundamental concepts of program state, user interaction, and error handling.

---

## Features

- **Game Setup**: Initializes a new game with two players.
- **Play Turns**: Players take turns placing their marks on a 3x3 board.
- **Win/Tie Detection**: Automatically detects a win or a tie.
- **Error Handling**: Ensures only valid moves are allowed.

---

## Code Overview

### **Game State**

The game's state is managed through a custom Solana account. Key attributes include:

- **Players**: Public keys of the two players.
- **Turn**: Tracks the current turn.
- **Board**: A 3x3 grid representing the board.
- **State**: Tracks if the game is active, tied, or won.

### **Game Logic**

The game logic is implemented in the `Game` struct, which provides methods for:

- **Starting the game**: Setting initial players and turn.
- **Making moves**: Placing marks on the board and validating them.
- **Checking game status**: Detecting wins, ties, and updating the state.

### **Instructions**

1. **`setup_game`**
   - Initializes the game account and sets the players.
   - Allocates space for the account and sets the turn.

2. **`play`**
   - Updates the board with a player's move.
   - Checks for a win or tie.
