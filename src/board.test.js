const {
  createPlaceShip,
  createReceiveAttack,
  createAllSunk,
} = require("./board");

describe("placeShip", () => {
  const fakeBoard = [
    { coordinates: [10, 5], ship: null },
    { coordinates: [11, 5], ship: null },
    { coordinates: [12, 5], ship: null },
    { coordinates: [13, 5], ship: null },
  ];
  const testCoordinates = [
    [10, 5],
    [11, 5],
    [12, 5],
    [13, 5],
  ];
  it("calls ship factory with correct length based on coordinates", () => {
    const fakeShipFactory = (length) => {
      expect(length).toBe(4);
    };
    createPlaceShip(fakeBoard, fakeShipFactory);
  });
  it("updates board correctly after placing ship", () => {
    const fakeShipFactory = (length) => {
      return {};
    };
    const placeShip = createPlaceShip(fakeBoard, fakeShipFactory);
    placeShip(testCoordinates);
    expect(fakeBoard[0].ship).toEqual({});
  });
});

describe("receiveAttack", () => {
  it("alerts ship when attack received", () => {
    const fakeShip = {
      hits: 6,
      hit: function () {
        this.hits++;
      },
    };
    const fakeBoard = [{ coordinates: [0, 1], ship: fakeShip }];
    const receiveAttack = createReceiveAttack(fakeBoard, []);
    receiveAttack([0, 1]);
    expect(fakeShip.hits).toBe(7);
  });
  it("records missed shot", () => {
    const missedSquares = [];
    const fakeBoard = [{ coordinates: [0, 0], ship: null }];
    const receiveAttack = createReceiveAttack(fakeBoard, missedSquares);
    receiveAttack([0, 0]);
    expect(missedSquares[0]).toEqual([0, 0]);
  });
  it("doesn't consider true hit missed", () => {
    const missedSquares = [];
    const fakeBoard = [{ coordinates: [0, 0], ship: { hit: () => {} } }];
    const receiveAttack = createReceiveAttack(fakeBoard, missedSquares);
    receiveAttack([0, 0]);
    expect(missedSquares[0]).toBeUndefined();
  });
});

describe("allSunk", () => {
  function isSunk() {
    if (this.length === this.hits) return true;
    else return false;
  }
  it("reports when all ships sunk", () => {
    const fakeBoard = [
      { coordinates: [0, 0], ship: { length: 5, hits: 5, isSunk } },
      { coordinates: [0, 1], ship: { length: 3, hits: 3, isSunk } },
      { coordinates: [1, 1], ship: { length: 4, hits: 4, isSunk } },
    ];
    const allSunk = createAllSunk(fakeBoard);
    expect(allSunk()).toBe(true);
  });
  it("recognizes when not all ships sunk", () => {
    const fakeBoard = [
      { coordinates: [0, 0], ship: { length: 5, hits: 4, isSunk } },
      { coordinates: [0, 1], ship: { length: 3, hits: 3, isSunk } },
      { coordinates: [1, 1], ship: { length: 4, hits: 4, isSunk } },
    ];
    const allSunk = createAllSunk(fakeBoard);
    expect(allSunk()).toBe(false);
  });
  it("handles multiple references to same ship", () => {
    const titanic = { length: 5, hits: 5, isSunk };
    const carpathia = { length: 3, hits: 0, isSunk };
    const fakeBoard = [
      { coordinates: [0, 0], ship: titanic },
      { coordinates: [0, 1], ship: carpathia },
      { coordinates: [1, 1], ship: carpathia },
    ];
    const allSunk = createAllSunk(fakeBoard);
    expect(allSunk()).toBe(false);
  });
});
