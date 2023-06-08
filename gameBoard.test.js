import { createGameBoard } from "./gameBoard";

test("Gameboard: is defined", () => {
  expect(createGameBoard()).toBeDefined();
});

test("Gameboard: is an array of 10", () => {
  expect(createGameBoard().board.length).toBe(10);
});

test("Gameboard: is a multi dimension array of 10", () => {
  expect(createGameBoard().board[0].length).toBe(10);
});

test("Gameboard: first and last elements class type = Cell", () => {
  expect(createGameBoard().board[0][0].constructor.name).toBe("Cell");
  expect(createGameBoard().board[9][9].constructor.name).toBe("Cell");
});

test("Gameboard: first and last cells are are un-hit", () => {
  expect(createGameBoard().board[0][0].isHit).toBe(false);
  expect(createGameBoard().board[9][9].isHit).toBe(false);
});

test("Gameboard: place ship outside board and check for failure", () => {
  let board = createGameBoard();
  expect(board.placeShipAt(3, [9, 9])).toBe(false);
  expect(board.placeShipAt(3, [8, 9])).toBe(false);
});

test("Gameboard: place ship inside board and check for success", () => {
  let board = createGameBoard("ki");
  expect(board.placeShipAt(3, [9, 7])).toBe(true);
  expect(board.placeShipAt(3, [8, 6])).toBe(true);
});

test("Gameboard: place ship and check array length = 1", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  expect(board.ships.length).toBe(1);
});

test("Gameboard: place ship and check it exists at location", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  expect(board.board[9][7].ship).toBeDefined();
});

test("Gameboard: place ship twice and check it is rejected", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  let result = board.placeShipAt(2, [9, 7]);
  expect(result).toBe(false);
});

test("Gameboard: place ship twice and check array length = 1", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  board.placeShipAt(2, [9, 7]);
  expect(board.ships.length).toBe(1);
});

test("Gameboard: place ship, attack location, check for hit", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  let result = board.attack(9, 8);
  expect(result).toBe("hit");
});
