// const { Board } = require("./Board");
// const { Player } = require("/Player");
// const { Settings } = require("./Settings");
const { pShips, cShips } = require("./test-ships");

const Game = (board, settings, makePlayer) => {
  const player = makePlayer(board, settings);
  // for testing
  if (player) {
    player.p.createShip(pShips[0]);
    player.p.createShip(pShips[1]);
  }
  if (player) {
    player.c.createShip(cShips[0]);
    player.c.createShip(cShips[1]);
  }

  const state = {};

  const start = () => {
    state.turn = player.p;
    state.winner = null;
    play();
  };

  const declareWinner = () => {
    alert("Winner!");
  };

  const checkState = () => {
    if (state.winner) {
      declareWinner(state.winner);
      state.turn = null;
    }
  };

  const checkTurn = () => {
    return state.turn;
  };

  const switchTurn = () => {
    state.turn = state.turn.next;
  };

  alertShipSunk = () => {
    alert("Ship sunk!");
  };

  retrieveCoordinate = () => {
    const x = Number(prompt("x:"));
    const y = Number(prompt("y:"));
    return [x, y];
  };

  const play = () => {
    checkState();
    const turn = checkTurn();
    if (turn) {
      if (turn == player.c) {
        alert("Computer turn"); //test
        const sunkResponse = player.c.sendHit(player.utils.random());
        if (sunkResponse == "sunk") alertShipSunk();
        const allSunkResponse = player.p.allSunk();
        if (allSunkResponse) {
          state.winner = player.c;
        }
      } else if (turn == player.p) {
        const sunkResponse = player.p.sendHit(retrieveCoordinate());
        if (sunkResponse == "sunk") alertShipSunk();
        const allSunkResponse = player.c.allSunk();
        if (allSunkResponse) {
          state.winner = player.p;
        }
      }
      switchTurn();
      play();
    } else return;
  };

  return { start };
};

module.exports = Game;
