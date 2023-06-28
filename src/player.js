let createPlayer = (name) => {
  let myBoard;
  let theirBoard;
  return {
    get name() {
      return name;
    },
    set theirBoard(board) {
      theirBoard = board;
    },
    set myBoard(board) {
      myBoard = board;
    },
    get myBoard() {
      return myBoard;
    },
    get theirBoard() {
      return theirBoard;
    },

    takeTurn(x, y) {
      return theirBoard.attack(x, y);
    },
    takeRandomTurn() {
      let board = theirBoard.board;
      let validMoves = [];
      //Create a 1d array of valid moves
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          if (!board[i][j].isHit) validMoves.push([i, j]);
        }
      }
      let random = Math.floor(Math.random() * validMoves.length);
      let x = validMoves[random][0];
      let y = validMoves[random][1];
      return theirBoard.attack(x, y);
    },
  };
};

export { createPlayer };
