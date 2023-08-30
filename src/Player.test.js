const Player = require("./Player");

it("calls board function using setting length", () => {
  //outgoing command
  const fakeSettings = { length: 10 };
  const fakeBoard = (input) => {
    const createSendHit = () => {};
    expect(input).toBe(10);
    return { createSendHit };
  };
  Player(fakeBoard, fakeSettings);
});
it("creates players with sendHit function", () => {
  //outgoing command
  const fakeSettings = { length: 10 };
  const fakeBoard = (input) => {
    const createSendHit = (arg1) => (arg2) => {
      return "Hit sent to other player";
    };
    return { createSendHit };
  };
  const testPlayer = Player(fakeBoard, fakeSettings);
  expect(testPlayer.p.sendHit()).toBe("Hit sent to other player");
  expect(testPlayer.c.sendHit()).toBe("Hit sent to other player");
});
it("calls sendHit with provided coordinates", () => {
  const fakeSettings = { length: 10 };
  const fakeBoard = (input) => {
    const createSendHit = (arg1) => (arg2) => {
      expect(arg2).toEqual([0, 2]);
    };
    return { createSendHit };
  };
  const testPlayer = Player(fakeBoard, fakeSettings);
  testPlayer.p.sendHit([0, 2]);
  testPlayer.c.sendHit([0, 2]);
});
it("calls sendHit with randomly generated coordinates", () => {
  const fakeSettings = { length: 10 };
  const fakeBoard = (input) => {
    const createSendHit = (arg1) => (arg2) => {
      expect(typeof arg2).toBe("number");
    };
    return { createSendHit };
  };
  const testPlayer = Player(fakeBoard, fakeSettings);
  testPlayer.p.sendHit(testPlayer.utils.random());
});
test("randomly generated coordinates are within correct bounds", () => {
  const fakeSettings = { length: 4 };
  const fakeBoard = (input) => {
    const createSendHit = (arg1) => (arg2) => {
      expect(arg2 < 16).toBe(true);
    };
    return { createSendHit };
  };
  const testPlayer = Player(fakeBoard, fakeSettings);
  for (let i = 0; i < 100; i++) {
    testPlayer.p.sendHit(testPlayer.utils.random());
  }
});
