import { createShip } from "./ship.js";

test("Create ship, test length", () => {
  expect(createShip(5).length).toBe(5);
});

test("Ship: record hit and test", () => {
  let ship = createShip(5);
  ship.hit();
  ship.hit();
  expect(ship.hitCount).toBe(2);
});

test("Ship: increment hitcount", () => {
  let ship = createShip(5);
  ship.hitCount++;
  ship.hitCount++;
  ship.hitCount++;
  expect(ship.hitCount).toBe(3);
});

test("Ship: test hits can't exceed length", () => {
  let ship = createShip(2);
  ship.hitCount++;
  ship.hitCount++;
  ship.hitCount++;
  expect(ship.hitCount).toBe(2);
});

test("Ship: test isSunk() true", () => {
  let ship = createShip(3);
  ship.hitCount++;
  ship.hitCount++;
  ship.hitCount++;
  expect(ship.isSunk()).toBe(true);
});

test("Ship: test isSunk() false", () => {
  let ship = createShip(4);
  ship.hitCount++;
  ship.hitCount++;
  ship.hitCount++;
  expect(ship.isSunk()).toBe(false);
});
