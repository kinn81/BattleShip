import { createPlayer } from "./player";
import { createGameBoard } from "./gameBoard";

test("Create player, test exists", () => {
  expect(createPlayer("Jane")).toBeDefined;
});

test("Create player, test the name", () => {
  let p1 = createPlayer("John");
  let p2 = createPlayer("Jane");
  expect(p1.name).toBe("John");
  expect(p2.name).toBe("Jane");
});

test("Create player with board, attack position, check hit registered", () => {
  let p1 = createPlayer("Jane");
  let gameBoard = createGameBoard();
  p1.theirBoard = gameBoard;
  gameBoard.placeShipAt(3, [9, 7]);
  let result = p1.takeTurn(9, 7);
  expect(result).toBe("hit");
  expect(gameBoard.ships[0].hitCount).toBe(1);
});

test("Player: test single rangom move", () => {
  let p1 = createPlayer("Jane");
  let gameBoard = createGameBoard();
  p1.theirBoard = gameBoard;
  let result = p1.takeRandomTurn();
  expect(result).toBe("miss");
});

test("Player: test single rangom move", () => {
  let p1 = createPlayer("Jane");
  let gameBoard = createGameBoard();
  p1.theirBoard = gameBoard;
  p1.takeRandomTurn();
  let hits = 0;
  for (let i = 0; i < gameBoard.board.length; i++) {
    for (let j = 0; j < gameBoard.board[i].length; j++) {
      if (gameBoard.board[i][j].isHit) hits++;
    }
  }
  expect(hits).toBe(1);
});

test("Player: take 100 random moves, check every cell is hit", () => {
  let p1 = createPlayer("John");
  let gameBoard = createGameBoard();
  p1.theirBoard = gameBoard;
  for (let i = 0; i < 100; i++) {
    p1.takeRandomTurn();
  }
  let result = true;
  loop1: for (let i = 0; i < gameBoard.board.length; i++) {
    loop2: for (let j = 0; j < gameBoard.board[i].length; j++) {
      if (!gameBoard.board[i][j].isHit) {
        result = false;
        break loop1;
      }
    }
  }
  expect(result).toBe(true);
});

test("Player: get myBoard and theirBoard", () => {
  let p1 = createPlayer("Jane");
  let p1Board = createGameBoard();
  let p2Board = createGameBoard();
  p1.theirBoard = p2Board;
  p1.myBoard = p1Board;
  expect(p1.theirBoard).toBe(p2Board);
  expect(p1.myBoard).toBe(p1Board);
});
