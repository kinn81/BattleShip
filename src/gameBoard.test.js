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

test("Gameboard: place ship, attack different location, check not hit", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  let result = board.attack(9, 6);
  expect(result).toBe("miss");
});

test("Gameboard: attack location, check cell is hit", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  board.attack(9, 6);
  expect(board.board[9][6].isHit).toBe(true);
});

test("Gameboard: place ship, attack twice, check ship hitcount", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  board.attack(9, 7);
  board.attack(9, 8);
  expect(board.board[9][7].ship.hitCount).toBe(2);
});

test("Gameboard: place ship, retrieve ship and check location matches", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  let ship = board.ships[0];
  expect(ship.location[0][0]).toBe(9);
  expect(ship.location[0][1]).toBe(7);

  expect(ship.location[1][0]).toBe(9);
  expect(ship.location[1][1]).toBe(8);

  expect(ship.location[2][0]).toBe(9);
  expect(ship.location[2][1]).toBe(9);
});

test("Gameboard: place ship, attack three times, check ship is sunk", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  let ship = board.ships[0];
  0;
  board.attack(9, 7);
  board.attack(9, 8);
  expect(ship.isSunk()).toBe(false);
  board.attack(9, 9);
  expect(ship.isSunk()).toBe(true);
});

test("Gameboard: place ships, sink both, check gameOver = true", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(2, [9, 7]);
  board.placeShipAt(2, [4, 2]);
  board.attack(9, 7);
  board.attack(9, 8);
  board.attack(4, 2);
  expect(board.gameOver()).toBe(false);
  board.attack(4, 3);
  expect(board.gameOver()).toBe(true);
});

test("Gameboard: check isValidMove() function", () => {
  let board = createGameBoard("ki");
  board.placeShipAt(3, [9, 7]);
  expect(board.checkValidMove(9, 7)).toBe(false);
  expect(board.checkValidMove(8, 7)).toBe(true);
});
