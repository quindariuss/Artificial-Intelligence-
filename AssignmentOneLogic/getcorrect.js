function getcorrect() {
    var correct = 0;
    for (let i = 0; i < board.length; i++) {
        for (let t = 0; t < board.length; t++) {
            if (board[i][t] === goalboard[i][t]) {
                correct++;
            }
        }
    }
    return correct;
}
