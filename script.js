document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const cells = Array.from({ length: 9 }, (_, index) => createCell(index));

    cells.forEach(cell => board.appendChild(cell));

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    function createCell(index) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(index));
        return cell;
    }

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !isGameFinished()) {
            gameBoard[index] = currentPlayer;
            cells[index].innerText = currentPlayer;
            
            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("It's a draw!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination =>
            combination.every(index => gameBoard[index] === currentPlayer)
        );
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    function isGameFinished() {
        return checkWinner() || isBoardFull();
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        cells.forEach(cell => cell.innerText = "");
    }
});
