const whoseTurn = (currentPlayer) => {
  return currentPlayer.next;
};

const createSendAttack = (receiveAttack) => (coordinates) => {
  receiveAttack(coordinates);
};

const createSendAIAttack = (board, receiveAttack) => () => {
  const availableCoordinates = [];
  board.forEach((square) => availableCoordinates.push(square.coordinates));
  const randomIndex = Math.floor(Math.random() * availableCoordinates.length);
  receiveAttack(availableCoordinates[randomIndex]);
};

module.exports = { whoseTurn, createSendAttack, createSendAIAttack };
