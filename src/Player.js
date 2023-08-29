const Board = (length) => {
  const board = new Array(length * length);
  const ships = new Array(length * length);

  for (let i = 0; i < length * length; i++) {
    board.push(0);
  }

  const get = (coordinate) => {
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
    const index = coordinate.isArray() ? get(coordinate) : coordinate;
    if (board[index] == 0) {
      const ship = checkShip[index];
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

  return { ALL };
};

module.exports = { Board };
