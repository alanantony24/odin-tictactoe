const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameBoard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  const getGameBoard = () => gameboard;

  return {
    render,
    update,
    getGameBoard
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "0"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    if (Gameboard.getGameBoard()[index] !== "") {
      return;
    }
    Gameboard.update(index, players[currentPlayerIndex].mark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    handleClick,
  };
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});
