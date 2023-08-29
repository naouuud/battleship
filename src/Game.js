const { Board } = require("./Board");
const { Settings } = require("./Settings");

const Game = (board, settings) => {
  const p = board(settings.length);
  const c = board(settings.length);
  p.sendHit = p.createSendHit(c);
  c.sendHit = c.createSendHit(p);

  const utils = ((settings) => {
    const random = () => {
      return Math.floor(Math.random() * settings.length * settings.length);
    };
    return { random };
  })();

  return { p, c, utils };
};
