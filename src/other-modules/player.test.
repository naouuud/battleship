const { whoseTurn, createSendAttack, createSendAIAttack } = require("./player");

describe("whoseTurn", () => {
  it("can return whose turn it is", () => {
    const player1 = {};
    const player2 = { next: player1 };
    Object.assign(player1, { next: player2 });
    let currentPlayer = player1;
    currentPlayer = whoseTurn(currentPlayer);
    expect(currentPlayer).toBe(player2);
    currentPlayer = whoseTurn(currentPlayer);
    expect(currentPlayer).toBe(player1);
    currentPlayer = whoseTurn(currentPlayer);
    expect(currentPlayer).toBe(player2);
  });
});

describe("createSendAttack", () => {
  it("sends attack command after coordinates received", () => {
    const mockReceiveAttack = (coordinates) => {
      expect(coordinates).toEqual([5, 2]);
    };
    const sendAttack = createSendAttack(mockReceiveAttack);
    sendAttack([5, 2]);
  });
});

describe("createSendAIAttack", () => {
  it("generates and sends ai coordinates", () => {
    const mockBoard = [
      { coordinates: [0, 0] },
      { coordinates: [0, 1] },
      { coordinates: [1, 0] },
      { coordinates: [1, 1] },
    ];
    const mockReceiveAttack = (coordinates) => {
      expect(typeof coordinates).toBe("object");
    };
    const sendAIAttack = createSendAIAttack(mockBoard, mockReceiveAttack);
    sendAIAttack();
  });

  it("generates sends valid ai coordinates", () => {
    const mockBoard = [{ coordinates: [5, 2] }];
    const mockReceiveAttack = (coordinates) => {
      expect(coordinates).toEqual([5, 2]);
    };
    const sendAIAttack = createSendAIAttack(mockBoard, mockReceiveAttack);
    sendAIAttack();
  });
});
