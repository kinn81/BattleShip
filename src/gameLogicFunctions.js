function initPlayers() {
  p1 = createPlayer("Jane");
  p1Board = createGameBoard();
  p1.myBoard = p1Board;
  p1Board.placeShipAt(3, [9, 7]);
  p1Board.placeShipAt(5, [0, 0]);

  p2 = createPlayer("John");
  p2Board = createGameBoard();
  p2.myBoard = p2Board;
  p2Board.placeShipAt(3, [9, 7]);
  p2Board.placeShipAt(5, [0, 0]);

  p1.theirBoard = p2Board;
  p2.theirBoard = p1Board;
}

function updatePlayerUI(board_DOM, player) {
  let playerBoard = player.myBoard;
  let domCells = board_DOM.children;

  for (let i = 0; i < playerBoard.ships.length; i++) {
    playerBoard.ships[i].location.forEach((location) => {
      let x = location[0];
      let y = location[1];
      let domIndex = x * 10 + y;
      domCells[domIndex].classList.add("occupiedCell");
      if (playerBoard.board[x][y].isHit) {
        domCells[domIndex].classList.add("hitCell");
      }
    });
  }
}

function updateOpponentUI(board_DOM, player) {
  let playerBoard = player.myBoard;
  let domCells = DOM.children;

  for (let i = 0; i < playerBoard.ships.length; i++) {
    playerBoard.ships[i].location.forEach((location) => {
      let x = location[0];
      let y = location[1];
      let domIndex = x * 10 + y;
    });
  }
}

function initBoards_DOM() {
  for (let i = 0; i < 100; i++) {
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div1.classList.add("cell");
    div2.classList.add("cell");
    p1Board_DOM.appendChild(div1);
    p2Board_DOM.appendChild(div2);
  }
}

export { initPlayers, initBoards_DOM, updateOpponentUI, updatePlayerUI };
