const newBoard = (factory, len) => {
  const list = [];
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      list.push(makeSquare(i, j));
    }
  }
  const get = (coordinate) => {
    const index = len * coordinate[0] + coordinate[1];
    return list[index];
  };
  const placeShip = (coordinates) => {
    const length = coordinates.length;
    const ship = factory(length);
    coordinates.forEach((coordinate) => {
      get(coordinate).ship = ship;
    });
  };
  const receiveAttack = (coordinates) => {
    const square = get(coordinates);
    if (square.hit) return "illegal";
    const ship = square.ship;
    if (ship) ship.hit();
    square.hit++;
  };
  return { get, placeShip, receiveAttack };
};

const createAllSunk = (board) => () => {
  const allShips = [];
  board.forEach((square) => {
    if (square.ship && !allShips.includes(square.ship))
      allShips.push(square.ship);
  });
  let allSunk = true;
  allShips.forEach((ship) => {
    allSunk = allSunk && ship.isSunk();
  });
  return allSunk;
};

const makeSquare = (x, y, ship = 0, hit = 0) => {
  return { x, y, ship, hit };
};

module.exports = {
  createAllSunk,
  newBoard,
};
