const Game = require("./Game");

it("calls player (which calls board) with correct length from settings", () => {
  //outgoing command
  const fakeBoard = (length) => {
    expect(length).toBe(10);
  };
  const fakeSettings = { length: 10 };
  const fakeMakePlayer = (board, settings) => {
    board(settings.length);
  };
  const testGame = Game(fakeBoard, fakeSettings, fakeMakePlayer);
});
