const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("startBtn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const resetBtn = document.getElementById("resetBtn");

// input pemain
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

// element game
const boardEl = document.getElementById("board");
const turnText = document.getElementById("turnText");
const nameX = document.getElementById("nameX");
const nameO = document.getElementById("nameO");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

// alert
const customAlert = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");
const alertOkBtn = document.getElementById("alertOkBtn");

let playerXName = "X";
let playerOName = "O";
let currentPlayer = "X";
let board = Array(9).fill(null);
let scores = { X: 0, O: 0, draw: 0 };
let isGameOver = false;

const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function showAlert(msg, callback = null) {
  alertMessage.textContent = msg;
  customAlert.classList.add("show");
  customAlert.classList.remove("hidden");

  alertOkBtn.onclick = () => {
    customAlert.classList.remove("show");
    setTimeout(() => customAlert.classList.add("hidden"), 400);
    if (callback) callback();
  };
}

startBtn.addEventListener("click", () => {
  if (!playerXInput.value || !playerOInput.value) {
    showAlert("Masukkan nama kedua pemain!");
    return;
  }

  playerXName = playerXInput.value;
  playerOName = playerOInput.value;
  nameX.textContent = playerXName;
  nameO.textContent = playerOName;

  setupScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  startNewBoard();
});

// game logic
function startNewBoard() {
  board = Array(9).fill(null);
  isGameOver = false;
  currentPlayer = "X";
  turnText.textContent = `Giliran: ${currentPlayer}`;

  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i, cell));
    boardEl.appendChild(cell);
  }
}

function handleMove(index, cell) {
  if (isGameOver || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.disabled = true;

  if (checkWinner(currentPlayer)) {
    isGameOver = true;
    const winnerName = currentPlayer === "X" ? playerXName : playerOName;
    scores[currentPlayer]++;
    updateScores();
    showAlert(`Pemenang: ${winnerName}!`);
  } else if (board.every(Boolean)) {
    isGameOver = true;
    scores.draw++;
    updateScores();
    showAlert("Seri!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.textContent = `Giliran: ${currentPlayer}`;
  }
}

function checkWinner(player) {
  return WIN_COMBOS.some(combo => combo.every(i => board[i] === player));
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

nextRoundBtn.addEventListener("click", () => {
  startNewBoard();
});

resetBtn.addEventListener("click", () => {
  showAlert("Apakah ingin reset penuh?", () => {
    scores = { X: 0, O: 0, draw: 0 };
    updateScores();
    setupScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    playerXInput.value = "";
    playerOInput.value = "";
  });
});
