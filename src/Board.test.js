const { Board } = require("./Board");

it("gets correct index based on coordinates", () => {
  let testBoard = Board(10);
  expect(testBoard.get([0, 4])).toBe(4);
  expect(testBoard.get([1, 4])).toBe(14);
  expect(testBoard.get([9, 9])).toBe(99);
  testBoard = Board(6);
  expect(testBoard.get([0, 5])).toBe(5);
  expect(testBoard.get([7, 8])).toBe(undefined);
  expect(testBoard.get([6, 6])).toBe(undefined);
  expect(testBoard.get([5, 5])).toBe(35);
});

it("places ships correctly", () => {
  let testBoard = Board(10);
  testCoordinates = [
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  testBoard.createShip(testCoordinates);
  expect(testBoard.checkShip([3, 4])).toBe(false);
  expect(testBoard.checkShip([4, 5])).toEqual({ life: 4 });
  expect(testBoard.checkShip([5, 5])).toEqual({ life: 4 });
  expect(testBoard.checkShip([8, 5])).toBe(false);
});

it("records hit", () => {
  const testBoard = Board(10);
  expect(testBoard.hit([5, 5])).toBe(undefined);
  expect(testBoard.hit([5, 5])).toBe("illegal");
  expect(testBoard.hit([4, 5])).toBe(undefined);
  expect(testBoard.hit([4, 5])).toBe("illegal");
});

it("hits correct ship", () => {
  let testBoard = Board(10);
  testCoordinates = [
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  testBoard.createShip(testCoordinates);
  expect(testBoard.checkShip([5, 5])).toEqual({ life: 4 });
  testBoard.hit([5, 5]);
  expect(testBoard.checkShip([5, 5])).toEqual({ life: 3 });
  expect(testBoard.checkShip([6, 5])).toEqual({ life: 3 });
  testBoard.hit([5, 5]);
  expect(testBoard.checkShip([5, 5])).toEqual({ life: 3 });
  testBoard.hit([6, 5]);
  expect(testBoard.checkShip([5, 5])).toEqual({ life: 2 });
  expect(testBoard.checkShip([4, 5])).toEqual({ life: 2 });
});

it("identifies when all ships sunk", () => {
  let testBoard = Board(10);
  testCoordinates = [
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  testBoard.createShip(testCoordinates);
  expect(testBoard.allSunk()).toBe(false);
  expect(testBoard.hit([4, 5])).toBe(undefined);
  expect(testBoard.allSunk()).toBe(false);
  expect(testBoard.hit([5, 5])).toBe(undefined);
  expect(testBoard.allSunk()).toBe(false);
  expect(testBoard.hit([6, 5])).toBe(undefined);
  expect(testBoard.allSunk()).toBe(false);
  expect(testBoard.hit([7, 5])).toBe("sunk");
  expect(testBoard.allSunk()).toBe(true);
});
