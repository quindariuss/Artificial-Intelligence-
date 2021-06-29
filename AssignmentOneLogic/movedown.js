function movedown() {
    for (let i = 0; i < board.length; i++) {
        for (let t = 0; t < board.length; t++) {
            if (board[i][t] === 0) {
                console.log({ i }, { t });
                zeroindex = i;
                zerosubindex = t;
            }
        }
    }

    board[zeroindex][zerosubindex] = board[zeroindex + 1][zerosubindex];

    board[zeroindex + 1][zerosubindex] = 0;
    console.log("moved down");
    return getcorrect();
}
