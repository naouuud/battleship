const { placeShip, receiveAttack, allSunk } = require("./board");

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
    placeShip(fakeBoard, fakeShipFactory, testCoordinates);
  });
  it("updates board correctly after placing ship", () => {
    const fakeShipFactory = (length) => {
      return {};
    };
    placeShip(fakeBoard, fakeShipFactory, testCoordinates);
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
    receiveAttack(fakeBoard, [0, 1]);
    expect(fakeShip.hits).toBe(7);
  });
  it("records missed shot", () => {
    const missedSquares = [];
    const fakeBoard = [{ coordinates: [0, 0], ship: null }];
    receiveAttack(fakeBoard, [0, 0], missedSquares);
    expect(missedSquares[0]).toEqual([0, 0]);
  });
  it("doesn't consider true hit missed", () => {
    const missedSquares = [];
    const fakeBoard = [{ coordinates: [0, 0], ship: { hit: () => {} } }];
    receiveAttack(fakeBoard, [0, 0], missedSquares);
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
    expect(allSunk(fakeBoard)).toBe(true);
  });
  it("recognizes when not all ships sunk", () => {
    const fakeBoard = [
      { coordinates: [0, 0], ship: { length: 5, hits: 4, isSunk } },
      { coordinates: [0, 1], ship: { length: 3, hits: 3, isSunk } },
      { coordinates: [1, 1], ship: { length: 4, hits: 4, isSunk } },
    ];
    expect(allSunk(fakeBoard)).toBe(false);
  });
  it("handles multiple references to same ship", () => {
    const titanic = { length: 5, hits: 5, isSunk };
    const carpathia = { length: 3, hits: 0, isSunk };
    const fakeBoard = [
      { coordinates: [0, 0], ship: titanic },
      { coordinates: [0, 1], ship: carpathia },
      { coordinates: [1, 1], ship: carpathia },
    ];
    expect(allSunk(fakeBoard)).toBe(false);
  });
});
