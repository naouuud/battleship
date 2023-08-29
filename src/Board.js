const Board = (length) => {
  const board = (() => {
    const array = new Array();
    for (let i = 0; i < length * length; i++) {
      array.push(0);
    }
    return array;
  })();
  const ships = new Array(length * length);

  const get = (coordinate) => {
    if (coordinate[0] >= length || coordinate[1] >= length) return;
    const index = length * coordinate[0] + coordinate[1];
    return index;
  };

  const createShip = (coordinates) => {
    const ship = { life: coordinates.length };
    coordinates.forEach((coordinate) => {
      ships[get(coordinate)] = ship;
    });
  };

  const checkShip = (coordinate) => {
    const index = get(coordinate);
    return ships[index] ? ships[index] : false;
  };

  const hit = (coordinate) => {
    const index = Array.isArray(coordinate) ? get(coordinate) : coordinate;
    if (board[index] == 0) {
      const ship = checkShip(coordinate);
      if (ship) ship.life -= 1;
      board[index] += 1;
    } else return "illegal";
  };

  const createSendHit = (otherPlayer) => (coordinate) => {
    otherPlayer.hit(coordinate);
  };

  const shipSunk = (ship) => {
    return ship.life == 0 ? true : false;
  };

  const allSunk = () => {
    return ships.reduce((prev, curr) => prev && shipSunk(curr), true);
  };

  return { get, createShip, checkShip, hit, createSendHit, shipSunk, allSunk };
};

module.exports = { Board };
