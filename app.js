document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div")); // makes and ARRAY FROM w/e
  const scoreDisplay = document.querySelector("#score");
  const startPause = document.querySelector("#start-pause");
  const width = 10;
  const height = 20;

  //tetrominoes
  const iTetro = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const lTetro = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const oTetro = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const tTetro = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const zTetro = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
  ];

  const tetros = [iTetro, lTetro, oTetro, tTetro, zTetro];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * tetros.length);

  let currentTetro = tetros[random][currentRotation];

  function draw() {
    currentTetro.forEach((cell) => {
      squares[currentPosition + cell].classList.add("tetromino");
    });
  }
  function undraw() {
    currentTetro.forEach((cell) => {
      squares[currentPosition + cell].classList.remove("tetromino");
    });
  }

  timerId = setInterval(moveDown, 200);
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    stopTetro();
  }

  function stopTetro() {
    if (
      currentTetro.some((cell) =>
        squares[currentPosition + cell + width].classList.contains("stop")
      )
    ) {
      currentTetro.forEach((index) =>
        squares[currentPosition + index].classList.add("stop")
      );
      random = Math.floor(Math.random() * tetros.length);
      currentTetro = tetros[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }
});
