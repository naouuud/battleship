const { createAllSunk, newBoard } = require("./board");
const { shipFactory } = require("./ship");

describe("placeShip", () => {
  const testCoordinates = [
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
  ];
  it("calls ship factory with correct length", () => {
    const fakeShipFactory = (length) => {
      expect(length).toBe(4);
    };
    const testBoard = newBoard(fakeShipFactory, 10);
    testBoard.placeShip(testCoordinates);
  });
  it("updates board correctly after placing ship", () => {
    const fakeShipFactory = (length) => {
      return "I am a new ship!";
    };
    const testBoard = newBoard(fakeShipFactory, 10);
    testBoard.placeShip(testCoordinates);
    expect(testBoard.get([5, 5]).ship).toBe("I am a new ship!");
    expect(testBoard.get([5, 6]).ship).toBe("I am a new ship!");
    expect(testBoard.get([5, 7]).ship).toBe("I am a new ship!");
    expect(testBoard.get([5, 8]).ship).toBe("I am a new ship!");
    expect(testBoard.get([5, 9]).ship).toBe(0);
  });
});

describe("receiveAttack", () => {
  const testBoard = newBoard(shipFactory, 10);
  testBoard.placeShip([
    [5, 5],
    [5, 6],
    [5, 7],
    [5, 8],
  ]);
  it("increments ship hits when attack received", () => {
    expect(testBoard.get([5, 5]).ship.hits).toBe(0);
    testBoard.receiveAttack([0, 1]);
    expect(testBoard.get([5, 5]).ship.hits).toBe(0);
    testBoard.receiveAttack([5, 5]);
    expect(testBoard.get([5, 5]).ship.hits).toBe(1);
    testBoard.receiveAttack([5, 8]);
    expect(testBoard.get([5, 5]).ship.hits).toBe(2);
    expect(testBoard.get([5, 6]).ship.hits).toBe(2);
    expect(testBoard.get([5, 9]).ship.hits).toBe(undefined);
  });
  it("records coordinates of missed attack for future reference", () => {
    expect(testBoard.get([0, 0]).hit).toBe(0);
    testBoard.receiveAttack([0, 0]);
    expect(testBoard.get([0, 0]).hit).toBe(1);
    expect(testBoard.get([0, 1]).hit).toBe(1);
    expect(testBoard.get([0, 2]).hit).toBe(0);
  });
  it("records coordinates of true attack for future reference", () => {
    expect(testBoard.get([5, 5]).hit).toBe(1);
    expect(testBoard.get([5, 8]).hit).toBe(1);
    expect(testBoard.get([5, 6]).hit).toBe(0);
  });
  it("rejects hit to same square twice", () => {
    const message = testBoard.receiveAttack([5, 5]);
    expect(message).toBe("illegal");
  });
});

// describe("allSunk", () => {
//   function isSunk() {
//     if (this.length === this.hits) return true;
//     else return false;
//   }
//   it("reports when all ships sunk", () => {
//     const fakeBoard = [
//       { coordinates: [0, 0], ship: { length: 5, hits: 5, isSunk } },
//       { coordinates: [0, 1], ship: { length: 3, hits: 3, isSunk } },
//       { coordinates: [1, 1], ship: { length: 4, hits: 4, isSunk } },
//     ];
//     const allSunk = createAllSunk(fakeBoard);
//     expect(allSunk()).toBe(true);
//   });
//   it("recognizes when not all ships sunk", () => {
//     const fakeBoard = [
//       { coordinates: [0, 0], ship: { length: 5, hits: 4, isSunk } },
//       { coordinates: [0, 1], ship: { length: 3, hits: 3, isSunk } },
//       { coordinates: [1, 1], ship: { length: 4, hits: 4, isSunk } },
//     ];
//     const allSunk = createAllSunk(fakeBoard);
//     expect(allSunk()).toBe(false);
//   });
//   it("handles multiple references to same ship", () => {
//     const titanic = { length: 5, hits: 5, isSunk };
//     const carpathia = { length: 3, hits: 0, isSunk };
//     const fakeBoard = [
//       { coordinates: [0, 0], ship: titanic },
//       { coordinates: [0, 1], ship: carpathia },
//       { coordinates: [1, 1], ship: carpathia },
//     ];
//     const allSunk = createAllSunk(fakeBoard);
//     expect(allSunk()).toBe(false);
//   });
// });
