const { Board } = require("./Player");

const Control = (settings, utilities, board, player) => {
  const startGame = () => {
    const p = player(board, settings.length);
    const c = player(board, settings.length);
    p.sendHit = p.createSendHit(c);
    c.sendHit = c.createSendHit(p);
    const util = utilities(settings);
  };
};

// hypothetical
const Settings = (DOM) => {
  return {
    length: DOM.length,
  };
};

const Utilities = (settings) => {
  const random = () => {
    return Math.floor(Math.random() * settings.length * settings.length);
  };
  return { random };
};

const Player = (board, length) => {
  return board(length);
};

const Score = () => {};

const Game = () => {};
