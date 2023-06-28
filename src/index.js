import "./styles.css";
import { createPlayer } from "./player";
import { createGameBoard } from "./gameBoard";
const p1Board_DOM = document.getElementById("p1");
const p2Board_DOM = document.getElementById("p2");
let p1;
let p2;
let p1Board;
let p2Board;
let currentPlayerTurn;
let winner;

initGame();
startGame();

async function sleep(miliSec) {
  return new Promise((resolve) => setTimeout(() => resolve(), miliSec));
}

function initGame() {
  initPlayers();
  initDOM();
  placeShips();
}

function placeShips() {}

function initPlayers() {
  p1 = createPlayer("Keir");
  p1Board = createGameBoard();
  p1.myBoard = p1Board;
  p1Board.placeShipAt(5, [0, 0]);
  p1Board.placeShipAt(4, [6, 2]);
  p1Board.placeShipAt(3, [4, 3]);
  p1Board.placeShipAt(3, [9, 7]);
  p1Board.placeShipAt(2, [2, 5]);

  p2 = createPlayer("John");
  p2Board = createGameBoard();
  p2.myBoard = p2Board;
  p2Board.placeShipAt(5, [0, 0]);
  p2Board.placeShipAt(4, [6, 2]);
  p2Board.placeShipAt(3, [4, 3]);
  p2Board.placeShipAt(3, [9, 7]);
  p2Board.placeShipAt(2, [2, 5]);

  p1.theirBoard = p2Board;
  p2.theirBoard = p1Board;
  currentPlayerTurn = p1;
  winner = null;
}

function initDOM() {
  for (let i = 0; i < 100; i++) {
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div2.addEventListener("click", recordPlayerMove);
    div1.classList.add("cell");
    div2.classList.add("cell");
    div1.dataset.index = i;
    div2.dataset.index = i;
    p1Board_DOM.appendChild(div1);
    p2Board_DOM.appendChild(div2);
  }
}

//ADD EVENT LISTENERS
function startGame() {
  document.getElementById("reset").addEventListener("click", resetGame);
  document.getElementById("overlay").addEventListener("click", function (e) {
    if (document.getElementById("modal").contains(e.target)) {
      resetGame();
    }
  });
  updatePlayerUI(p1Board_DOM, p1);
}

function resetGame() {
  p1Board_DOM.replaceChildren();
  p2Board_DOM.replaceChildren();
  document.getElementById("container").classList.remove("blur");
  document.getElementById("overlay").style.display = "none";
  initGame();
  startGame();
}

function updatePlayerUI(board_DOM, player) {
  let playerBoard = player.myBoard.board;
  let domCells = board_DOM.children;

  for (let i = 0; i < playerBoard.length; i++) {
    for (let j = 0; j < playerBoard[0].length; j++) {
      let domIndex = i * 10 + j;
      if (playerBoard[i][j].ship) {
        if (playerBoard[i][j].isHit) {
          domCells[domIndex].classList.add("hitCell");
        } else if (player == p1)
          domCells[domIndex].classList.add("occupiedCell");
      } else if (playerBoard[i][j].isHit) {
        domCells[domIndex].textContent = "X";
      }
    }
  }
}

function recordPlayerMove(e) {
  if (!winner) {
    if (currentPlayerTurn == p1) {
      let x = Math.floor(e.target.dataset.index / 10);
      let y = e.target.dataset.index % 10;
      p1.takeTurn(x, y);
      updatePlayerUI(p2Board_DOM, p2);
      if (p2Board.gameOver()) {
        winner = p1;
        gameOver();
        return;
      }
      currentPlayerTurn = p2;
      computerMove();
    }
  }
}

function gameOver() {
  document.getElementById("container").className += "blur";
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("modal").textContent = `${winner.name} Wins!`;
}

async function computerMove() {
  if (!winner) {
    await sleep(100);
    p2.takeRandomTurn();
    updatePlayerUI(p1Board_DOM, p1);
    if (p1Board.gameOver()) {
      winner = p2;
      gameOver();
      return;
    }
    currentPlayerTurn = p1;
  }
}
