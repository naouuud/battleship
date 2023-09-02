// const { Board } = require("./Board");
// const { Player } = require("/Player");
// const { Settings } = require("./Settings");
const { pShips, cShips } = require("./test-ships");

const Game = (board, settings, makePlayer, makeDOM) => {
  const player = makePlayer(board, settings);
  const dom = makeDOM();
  // for testing
  if (player) {
    player.p.createShip(pShips[0]);
    player.p.createShip(pShips[1]);
  }
  if (player) {
    player.c.createShip(cShips[0]);
    player.c.createShip(cShips[1]);
  }

  // initial state
  let state = {
    turn: null,
    length: settings.length,
    cBoard: player.c.board,
    pBoard: player.p.board,
    cShips: player.c.ships,
    pShips: player.p.ships,
    winner: null,
  };
  dom.build(state);

  // function updateAllBoards() {
  //   state = Object.assign(state, {
  //     cBoard: player.c.board,
  //     pBoard: player.p.board,
  //     cShips: player.c.ships,
  //     pShips: player.p.ships,
  //   });
  // }

  const checkWinner = () => {
    if (player.c.allSunk()) {
      state.turn = null;
      alert("Player wins!");
    }
    if (player.p.allSunk()) {
      state.turn = null;
      alert("Computer wins!");
    }
  };

  const play = () => {
    checkWinner();
    if (state.turn) {
      if (state.turn === "player") {
        // console.log("player");
        player.p.sendHit(player.utils.random());
        dom.build(state);
        state.turn = "computer";
      } else if (state.turn === "computer") {
        // console.log("computer");
        player.c.sendHit(player.utils.random());
        dom.build(state);
        state.turn = "player";
      }
      // updateBoards();
      // switchTurn();
      setTimeout(play, 20);
    } else return;
  };

  const start = () => {
    state.turn = "player";
    state.winner = null;
    play();
  };

  return { start };
};

module.exports = Game;
