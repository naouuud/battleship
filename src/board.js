const createPlaceShip = (board, factory) => (coordinates) => {
  const length = coordinates.length;
  const ship = factory(length);
  coordinates.forEach((coordinate) => {
    const square = board.find(
      (square) =>
        JSON.stringify(square.coordinates) === JSON.stringify(coordinate)
    );
    square.ship = ship;
  });
  return board;
};

const createReceiveAttack = (board) => (attackCoordinates) => {
  const square = board.find(
    (square) =>
      JSON.stringify(square.coordinates) === JSON.stringify(attackCoordinates)
  );
  if (square.alreadyHit) return "Illegal";
  const ship = square.ship;
  if (ship) ship.hit();
  square.alreadyHit = true;
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

// newBoard, might move this elsewhere (a general utilities module?)
const newBoard = (len) => {
  columns = [];
  for (let i = 0; i < len; i++) {
    columns[i] = [];
    for (let j = 0; j < len; j++) columns[i].push(0);
  }
  return columns;
};

module.exports = {
  createPlaceShip,
  createAllSunk,
  createReceiveAttack,
  newBoard,
};
