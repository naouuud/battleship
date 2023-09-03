// const { Board } = require("./Board");
// const { Player } = require("/Player");
// const { Settings } = require("./Settings");
const { pShips, cShips } = require("./test-ships");

const Game = (board, settings, makePlayer, makeDOM) => {
  const player = makePlayer(board, settings);

  const state = (() => {
    const length = settings.length;
    const cBoard = player.c.board;
    const pBoard = player.p.board;
    const cShips = player.c.ships;
    const pShips = player.p.ships;
    const active = true;
    return { length, cBoard, pBoard, cShips, pShips, active };
  })();
  const dom = makeDOM(state);

  const checkWinner = () => {
    if (player.c.allSunk()) {
      state.active = false;
      document.querySelector(".attack").innerText = "You win!";
    }
    if (player.p.allSunk()) {
      state.active = false;
      document.querySelector(".attack").innerText = "You lose!";
    }
  };

  const pPlay = () => {
    checkWinner();
    if (state.active) {
      const attack = document.querySelector(".attack");
      attack.innerText = "Attack your opponent!";
      const squares = document.querySelectorAll(".opp .square");
      for (let i = 0; i < squares.length; i++) {
        if (state.cBoard[i] === 0) {
          squares[i].addEventListener("click", (e) => {
            const index = e.target.getAttribute("index");
            player.p.sendHit(index);
            dom.build(state);
            cPlay();
          });
        }
      }
    }
  };

  const cPlay = () => {
    checkWinner();
    if (state.active) {
      setTimeout(() => {
        let random = player.utils.random();
        while (state.pBoard[random] === 1) {
          random = player.utils.random();
        }
        player.c.sendHit(random);
        dom.build(state);
        pPlay();
      }, 1200);
    }
  };

  const start = () => {
    (function testShips() {
      player.p.createShip([4, 5, 6, 7]);
      player.p.createShip([9, 17, 25, 33]);
      player.p.createShip([39, 47, 55]);
      player.p.createShip([56, 57]);
      player.c.createShip([0, 1, 2, 3]);
      player.c.createShip([16, 24, 32, 40]);
      player.c.createShip([21, 22, 23]);
      player.c.createShip([39, 47, 55, 63]);
    })();
    dom.build();
    pPlay();
  };

  return { start };
};

module.exports = Game;
