const placeShip = (board, factory, coordinates) => {
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

const receiveAttack = (board, attackCoordinates, missedShots) => {
  const square = board.find(
    (square) =>
      JSON.stringify(square.coordinates) === JSON.stringify(attackCoordinates)
  );
  const ship = square.ship;
  if (ship) ship.hit();
  else missedShots.push(square.coordinates);
};

const allSunk = (board) => {
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

module.exports = { placeShip, receiveAttack, allSunk };
