const { shipFactory } = require("./ship");

describe("Ship", () => {
  it("returns ship object", () => {
    expect(typeof shipFactory(5)).toBe("object");
  });
  it("returns ship object with correct properties", () => {
    const ship = shipFactory();
    expect(Object.keys(ship)).toEqual(["length", "hits", "isSunk", "hit"]);
  });
  it("increments hits when attack received", () => {
    const ship = shipFactory(5);
    ship.hit();
    expect(ship.hits).toBe(1);
  });
  it("correctly alerts if unsunk", () => {
    const ship = shipFactory(5);
    expect(ship.isSunk()).toBe(false);
  });
  it("correctly alerts if sunk", () => {
    const ship = Object.assign(shipFactory(5), { hits: 5 });
    expect(ship.isSunk()).toBe(true);
  });
});
