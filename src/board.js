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

const createReceiveAttack = (board, missed) => (attackCoordinates) => {
  const square = board.find(
    (square) =>
      JSON.stringify(square.coordinates) === JSON.stringify(attackCoordinates)
  );
  const ship = square.ship;
  if (ship) ship.hit();
  else missed.push(square.coordinates);
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

module.exports = { createPlaceShip, createAllSunk, createReceiveAttack };
