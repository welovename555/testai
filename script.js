const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');
let board = ["","","","","","","","",""];
let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    if (board[index] !== "" || !gameActive) return;
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a,b,c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        status.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (!board.includes("")) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
    board = ["","","","","","","","",""];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = "X's turn";
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
status.textContent = `${currentPlayer}'s turn`;
