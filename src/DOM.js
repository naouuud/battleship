const DOM = () => {
  const title = document.createElement("h2");
  title.innerText = "BATTLESHIPS!";
  document.body.appendChild(title);

  const boards = document.createElement("div");
  boards.classList.add("boards");
  document.body.appendChild(boards);

  const build = (state) => {
    document.querySelector(".boards").innerHTML = "";
    const oppBoard = document.createElement("div");
    oppBoard.classList.add("board");
    oppBoard.classList.add("opp");
    boards.appendChild(oppBoard);

    for (let i = 0; i < state.cBoard.length; i++) {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("index", i);
      if (state.cBoard[i] === 0) {
        div.classList.add("not-hit");
      } else if (state.cShips[i]) {
        div.classList.add("hit-ship");
      } else {
        div.classList.add("hit-empty");
      }
      oppBoard.appendChild(div);
    }

    const ownBoard = document.createElement("div");
    ownBoard.classList.add("board");
    ownBoard.classList.add("own");
    boards.appendChild(ownBoard);

    for (let i = 0; i < state.pBoard.length; i++) {
      const div = document.createElement("div");
      div.classList.add("square");
      div.setAttribute("index", i);
      if (state.pBoard[i] === 0) {
        div.classList.add("not-hit");
      } else if (state.pShips[i]) {
        div.classList.add("hit-ship");
      } else {
        div.classList.add("hit-empty");
      }
      ownBoard.appendChild(div);
    }
  };

  return { build };
};

module.exports = DOM;
