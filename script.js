let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let mode = "2p"; // default mode

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  document.getElementById("status").textContent = `Mode: ${mode === 'ai' ? 'Player vs AI' : '2 Players'}`;
}

function handleClick(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  updateBoard();

  if (checkWin(currentPlayer)) {
    document.getElementById("status").textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 500); // Small delay for realism
  }
}

function aiMove() {
  if (!gameActive) return;

  // Basic AI: choose random empty cell
  const emptyCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  handleClick(randomIndex);
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").textContent = "";
  updateBoard();
}