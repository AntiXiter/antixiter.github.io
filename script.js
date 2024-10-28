const board = Array(9).fill(null);
let currentPlayer = 'X';
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', () => makeMove(cell));
});

function makeMove(cell) {
    const index = cell.getAttribute('data-index');

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} venceu!`;
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = 'Empate!';
    } else {
        currentPlayer = 'O';
        aiMove();
    }
}

function aiMove() {
    const availableMoves = board.map((val, idx) => (val ? null : idx)).filter(v => v !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    board[randomMove] = 'O';
    cells[randomMove].textContent = 'O';

    if (checkWinner()) {
        statusDisplay.textContent = 'O venceu!';
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusDisplay.textContent = '';
    currentPlayer = 'X';
}
