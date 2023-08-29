const { Player } = require("./Player");

it("calls board function using setting length", () => {
  const fakeSettings = { length: 10 };
  const fakeBoard = (input) => {
    const createSendHit = () => {};
    expect(input).toBe(10);
    return { createSendHit };
  };
  Player(fakeBoard, fakeSettings);
});
it("creates players with sendHit function", () => {
  const fakeSettings = { length: 10 };
  const fakeBoard = (input) => {
    const createSendHit = () => {
      return "Hit sent to other player";
    };
    return { createSendHit };
  };
  const testPlayer = Player(fakeBoard, fakeSettings);
  expect(testPlayer.p.sendHit()).toBe("Hit sent to other player");
  expect(testPlayer.c.sendHit()).toBe("Hit sent to other player");
});
