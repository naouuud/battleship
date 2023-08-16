const { createPlaceShip, newBoard } = require("./board");
const { shipFactory } = require("./ship");

const newGame = (param) => {
  // initialize all (IFFE?)
  const placeShip = createPlaceShip(newBoard((len = 10)), shipFactory);
};

// export to index for testing
module.exports = { newBoard, placeShip };
