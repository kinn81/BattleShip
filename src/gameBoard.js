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

let createGameBoard = () => {
  let ships = [];
  let board = [10];
  //Create board array
  for (let i = 0; i < 10; i++) {
    board[i] = new Array(10);
    for (let j = 0; j < 10; j++) {
      board[i][j] = new Cell();
    }
  }
  let checkValidMove = (x, y) => {
    if (x < 9 && y < 9) {
      if (!board[x][y].isHit) return true;
    }
    return false;
  };

  let placeShipAt = (shipSize, location) => {
    if (!shipFits(shipSize, location, "hor")) return false; //Check ship size will fit at location
    let ship = createShip(shipSize); //Create a new ship of size
    ships.push(ship); //Store the ship in the gameboards array
    for (let i = 0; i < shipSize; i++) {
      board[location[0]][location[1] + i].ship = ship; //Add the ship to each cell on the board
      ship.setSingleLocation([location[0], location[1] + i]);
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
    } else {
      board[x][y].isHit = true;
      return "miss";
    }
  };
  let gameOver = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) return false;
    }
    return true;
  };
  let shipFits = (size, location, direction = "hor") => {
    if (direction == "hor") {
      if (location[1] + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (board[location[0]][location[1] + i].ship != undefined) return false;
      }
    }
    return true;
  };
  return {
    board,
    ships,
    checkValidMove,
    placeShipAt,
    rotateShipAt,
    attack,
    gameOver,
  };
};

export { createGameBoard };
