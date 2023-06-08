import { createShip } from "./ship";
class Cell {
  #ship;
  #isHit;

  constructor() {
    this.#ship = undefined;
    this.#isHit = false;
  }

  set ship(value) {
    this.#ship = value;
  }

  set isHit(value) {
    this.#isHit = value;
  }

  get ship() {
    return this.#ship;
  }

  get isHit() {
    return this.#isHit;
  }
}

let createGameBoard = (player) => {
  let name = player;
  //Create board array
  let board = [10];
  for (let i = 0; i < 10; i++) {
    board[i] = new Array(10);
    for (let j = 0; j < 10; j++) {
      board[i][j] = new Cell();
    }
  }
  let ships = [];
  let placeShipAt = (shipSize, location) => {
    if (!shipFits(shipSize, location, "hor")) return false;
    let ship = createShip(shipSize); //Create a new ship of size
    ships.push(ship); //Store the ship in the gameboards array
    for (let i = 0; i < shipSize; i++) {
      board[location[0]][location[1] + i].ship = ship; //Add the ship to each cell on the board
    }
    return true;
  };
  let printBoard = () => {};
  let rotateShipAt = (location) => {};
  let attack = (x, y) => {
    let ship = board[x][y].ship;
    if (ship != undefined) {
      if (!ship.isSunk()) {
        if (ship.hit()) return "hit";
      }
    }
  };
  let gameOver = () => {};
  let shipFits = (size, location, direction = "hor") => {
    if (direction == "hor") {
      if (location[1] + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (board[location[0]][location[1] + i].ship != undefined) return false;
      }
    }
    return true;
  };
  return { name, board, ships, placeShipAt, rotateShipAt, attack, gameOver };
};

export { createGameBoard };
