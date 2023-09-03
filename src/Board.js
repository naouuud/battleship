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
      const index = Array.isArray(coordinate) ? get(coordinate) : coordinate;
      ships[index] = ship;
    });
  };

  const checkShip = (index) => {
    const result = ships[index];
    return result ? ships[index] : null;
  };

  const hit = (index) => {
    if (board[index] === 0) {
      board[index] = 1;
      const ship = checkShip(index);
      if (ship) ship.life -= 1;
    } else return;
  };

  const createSendHit = (otherPlayer) => (coordinate) => {
    const index = Array.isArray(coordinate) ? get(coordinate) : coordinate;
    otherPlayer.hit(index);
  };

  const shipSunk = (ship) => {
    return ship.life === 0 ? true : false;
  };

  const allSunk = () => {
    return ships.reduce((prev, curr) => prev && shipSunk(curr), true);
  };

  return {
    get,
    createShip,
    checkShip,
    hit,
    createSendHit,
    allSunk,
    board,
    ships,
  };
};

module.exports = Board;
