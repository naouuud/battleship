const DOM = (state) => {
  const title = document.createElement("h1");
  title.innerText = "Battleships";
  document.body.appendChild(title);

  const boards = document.createElement("div");
  boards.classList.add("boards");
  document.body.appendChild(boards);

  const attack = document.createElement("div");
  attack.classList.add("attack");
  document.body.appendChild(attack);

  const build = () => {
    document.querySelector(".boards").innerHTML = "";
    document.querySelector(".attack").innerText = "";

    const ownBoard = document.createElement("div");
    ownBoard.classList.add("board");
    ownBoard.classList.add("own");
    boards.appendChild(ownBoard);

    const pSquares = document.createElement("div");
    pSquares.classList.add("squares");
    ownBoard.appendChild(pSquares);

    for (let i = 0; i < state.pBoard.length; i++) {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("index", i);
      if (!state.pShips[i]) {
        div.classList.add("blue");
        if (state.pBoard[i] === 1) {
          div.classList.add("white-border");
        }
      } else if (state.pShips[i].life === 0) {
        div.classList.add("purple");
      } else if (state.pBoard[i] === 1) {
        div.classList.add("brown");
      } else div.classList.add("grey");
      pSquares.appendChild(div);
    }

    const pLabel = document.createElement("div");
    pLabel.classList.add("label");
    pLabel.innerText = "Your board";
    ownBoard.append(pLabel);

    const oppBoard = document.createElement("div");
    oppBoard.classList.add("board");
    oppBoard.classList.add("opp");
    boards.appendChild(oppBoard);

    const cSquares = document.createElement("div");
    cSquares.classList.add("squares");
    oppBoard.appendChild(cSquares);

    for (let i = 0; i < state.cBoard.length; i++) {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("index", i);
      if (state.cBoard[i] === 1) {
        if (!state.cShips[i]) {
          div.classList.add("blue");
        } else if (state.cShips[i].life === 0) {
          div.classList.add("purple");
        } else {
          div.classList.add("brown");
        }
      }
      cSquares.appendChild(div);
    }

    const cLabel = document.createElement("div");
    cLabel.classList.add("label");
    cLabel.innerText = "Opponent board";
    oppBoard.append(cLabel);
  };

  return { build };
};

module.exports = DOM;
