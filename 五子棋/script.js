const BOARD_SIZE = 15;
let board = [];
let currentPlayer = 'black';
let gameActive = true;
let lastMove = null;

const boardElement = document.getElementById('board');
const boardGridElement = document.getElementById('board-grid');
const statusElement = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const boardContainerElement = document.getElementById('board-container');

function initGame() {
    board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
    currentPlayer = 'black';
    gameActive = true;
    lastMove = null;
    
    updateStatus();
    boardContainerElement.dataset.turn = currentPlayer;
    
    // Draw grid lines and star points (hoshi)
    let gridLinesHTML = '';
    for(let i = 0; i < BOARD_SIZE; i++) {
        gridLinesHTML += `<div class="h-line" style="--index: ${i}"></div>`;
        gridLinesHTML += `<div class="v-line" style="--index: ${i}"></div>`;
    }
    const starPoints = [{x: 7, y: 7}, {x: 3, y: 3}, {x: 11, y: 3}, {x: 3, y: 11}, {x: 11, y: 11}];
    starPoints.forEach(p => {
        gridLinesHTML += `<div class="star-point" style="--index-x: ${p.x}; --index-y: ${p.y}"></div>`;
    });
    boardGridElement.innerHTML = gridLinesHTML;
    
    // Create cells
    boardElement.innerHTML = '';
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'empty');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener('click', () => handleCellClick(x, y));
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(x, y) {
    if (!gameActive || board[y][x]) return;

    // Place stone in logical board
    board[y][x] = currentPlayer;
    
    // Update UI
    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    cell.classList.remove('empty');
    
    // Remove last-move indicator from previous stone
    if (lastMove) {
        const prevCell = document.querySelector(`.cell[data-x="${lastMove.x}"][data-y="${lastMove.y}"] .stone`);
        if (prevCell) prevCell.classList.remove('last-move');
    }

    const stone = document.createElement('div');
    stone.classList.add('stone', currentPlayer, 'last-move');
    cell.appendChild(stone);

    lastMove = {x, y};

    // Check for win
    const winPath = checkWin(x, y, currentPlayer);
    if (winPath) {
        gameActive = false;
        highlightWin(winPath);
        showWin(currentPlayer);
        boardContainerElement.removeAttribute('data-turn');
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    updateStatus();
    boardContainerElement.dataset.turn = currentPlayer;
}

function updateStatus() {
    const colorText = currentPlayer === 'black' ? '黑子' : '白子';
    const colorClass = currentPlayer === 'black' ? 'black-text' : 'white-text';
    statusElement.innerHTML = `目前輪到：<span class="player ${colorClass}">${colorText}</span>`;
}

function showWin(winner) {
    const colorText = winner === 'black' ? '黑子' : '白子';
    const colorClass = winner === 'black' ? 'black-text' : 'white-text';
    statusElement.innerHTML = `🎉 遊戲結束！<span class="player ${colorClass}">${colorText}</span> 獲勝！`;
}

function highlightWin(winPath) {
    winPath.forEach(pos => {
        const cell = document.querySelector(`.cell[data-x="${pos.x}"][data-y="${pos.y}"]`);
        if (cell) {
            cell.classList.add('win-path');
        }
    });
}

function checkWin(x, y, player) {
    const dirs = [
        [[1, 0], [-1, 0]],   // Horizontal
        [[0, 1], [0, -1]],   // Vertical
        [[1, 1], [-1, -1]],  // Diagonal \
        [[1, -1], [-1, 1]]   // Diagonal /
    ];

    for (let dir of dirs) {
        let count = 1;
        let path = [{x, y}];

        for (let d of dir) {
            let currX = x + d[0];
            let currY = y + d[1];

            while (
                currX >= 0 && currX < BOARD_SIZE &&
                currY >= 0 && currY < BOARD_SIZE &&
                board[currY][currX] === player
            ) {
                count++;
                path.push({x: currX, y: currY});
                currX += d[0];
                currY += d[1];
            }
        }

        if (count >= 5) {
            return path;
        }
    }

    return null;
}

restartBtn.addEventListener('click', initGame);

// Start the game initially
initGame();
