//CHECK for consecutive discs

const checkDirection = (board, row, col, rowDir, colDir, playerId) => {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        const r = row + rowDir * i;
        const c = col + colDir * i;


        //CHECK for in bounds and matching player
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === playerId) {
            count++;
        } else {
            break;
        }

    }
    return count === 4;
};

const isWinningMove = (board, row, col, playerId) => {
    return (
        checkDirection(board, row, col, 0, 1, playerId) ||
        checkDirection(board, row, col, 1, 0, playerId) ||
        checkDirection(board, row, col, 1, 1, playerId) || checkDirection(board, row, col, 1, -1, playerId)
    );
};

module.exports = { isWinningMove };