document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  for (i = 0; i < 200; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
  }
  for (i = 0; i < 10; i++) {
    const cell = document.createElement("div");
    cell.className = "stop";
    grid.appendChild(cell);
  }
  let squares = Array.from(document.querySelectorAll(".grid div")); // makes and ARRAY FROM w/e
  const scoreDisplay = document.querySelector("#score");
  const levelDisplay = document.querySelector("#level");
  const startPause = document.querySelector("#start-pause");
  const width = 10;
  let timerId;
  let score = 0;
  scoreDisplay.innerHTML = score;
  let level = 1;
  levelDisplay.innerHTML = level;
  const colours = ["orange", "red", "blue", "green", "yellow"];

  var interval = (6 - level) * 100;

  startPause.addEventListener("click", () => {
    if (timerId) {
      console.log("clear interval " + timerId);
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      console.log("set interval " + interval);
      timerId = setInterval(moveDown, 500);
      nextRandom = Math.floor(Math.random() * tetros.length);
      miniGridShape();
    }
  });

  function addScore() {
    // Calculating what is a row
    for (i = 0; i < 199; i += width) {
      const row = [];
      for (j = 0; j < 10; j += 1) {
        row.push(i + j);
      }
      if (row.every((cell) => squares[cell].classList.contains("stop"))) {
        score += 10;
        level += 1;
        scoreDisplay.innerHTML = score;
        levelDisplay.innerHTML = level;
        row.forEach((cell) => {
          squares[cell].classList.remove("stop");
          squares[cell].classList.remove("tetromino");
          squares[cell].style.backgroundColor = "";
        });
        const rowRemoved = squares.splice(i, width);
        squares = rowRemoved.concat(squares);
        squares.forEach((square) => grid.appendChild(square));
      }
    }
  }

  function gameOver() {
    if (
      currentTetro.some((cell) =>
        squares[currentPosition + cell].classList.contains("stop")
      )
    ) {
      scoreDisplay.innerHTML = "Game Over";
      clearInterval(timerId);
    }
  }

  // Tetrominoes. Contains an array of arrays. Each inner array points to indexes. indexes combined = shape of tetro.
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

  // Choose a tetro at random and 1st rotation shape
  let random = Math.floor(Math.random() * tetros.length);
  let nextRandom = 0;
  let currentTetro = tetros[random][currentRotation];

  function draw() {
    currentTetro.forEach((cell) => {
      squares[currentPosition + cell].classList.add("tetromino");
      squares[currentPosition + cell].style.backgroundColor = colours[random]; // assigns colour at same index in colours array as in tetros array
    });
  }
  function undraw() {
    currentTetro.forEach((cell) => {
      squares[currentPosition + cell].classList.remove("tetromino");
      squares[currentPosition + cell].style.backgroundColor = "";
    });
  }

  function moveDown() {
    undraw();
    currentPosition += width; // Adds 10 to index, thus moving it down one line
    draw();
    stopTetro();
  }

  function stopTetro() {
    // If tetro hits a stop point (bottom of grid or other tetro), then stop class is applied
    if (
      currentTetro.some((cell) =>
        squares[currentPosition + cell + width].classList.contains("stop")
      )
    ) {
      currentTetro.forEach((cell) =>
        squares[currentPosition + cell].classList.add("stop")
      );
      // Triggers next tetro
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetros.length); // for unity with mini grid
      currentTetro = tetros[random][currentRotation];
      currentPosition = 4;
      draw();
      miniGridShape();
      addScore();
      gameOver();
    }
  }

  // Key controls
  function control(event) {
    if (event.keyCode === 37) {
      moveLeft();
    } else if (event.keyCode === 38) {
      rotate();
    } else if (event.keyCode === 39) {
      moveRight();
    } else if (event.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  function moveLeft() {
    undraw();
    const isAtLeftEdge = currentTetro.some(
      (cell) => (currentPosition + cell) % width === 0 // Because index of divs down left hand side are all factors of 10
    );
    if (!isAtLeftEdge) currentPosition -= 1;
    if (
      currentTetro.some((cell) =>
        squares[currentPosition + cell].classList.contains("stop")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }
  function moveRight() {
    undraw();
    const isAtRightEdge = currentTetro.some(
      (cell) => (currentPosition + cell) % width === width - 1 // Because index of divs down right hand side are all factors of 9
    );
    if (!isAtRightEdge) currentPosition += 1;
    if (
      currentTetro.some((cell) =>
        squares[currentPosition + cell].classList.contains("stop")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    // Resets iteration through tetro shapes array
    if (currentRotation === currentTetro.length) {
      currentRotation = 0;
    }
    currentTetro = tetros[random][currentRotation];
    if (
      currentTetro.some((cell) =>
        squares[currentPosition + cell + width].classList.contains("stop")
      )
    ) {
      return;
    }
    draw();
  }

  // mini grid
  const miniGridSquares = document.querySelectorAll(".mini-grid div");
  const miniGridWidth = 4;
  let miniGridIndex = 0;

  const upNextTetros = [
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, miniGridWidth * 3 + 1],
    [1, miniGridWidth + 1, miniGridWidth * 2 + 1, 2],
    [0, 1, miniGridWidth, miniGridWidth + 1],
    [1, miniGridWidth, miniGridWidth + 1, miniGridWidth + 2],
    [
      miniGridWidth + 1,
      miniGridWidth + 2,
      miniGridWidth * 2,
      miniGridWidth * 2 + 1,
    ],
  ];

  function miniGridShape() {
    miniGridSquares.forEach((cell) => {
      cell.classList.remove("tetromino");
      cell.style.backgroundColor = "";
    });
    upNextTetros[nextRandom].forEach((i) => {
      miniGridSquares[miniGridIndex + i].classList.add("tetromino");
      miniGridSquares[miniGridIndex + i].style.backgroundColor =
        colours[nextRandom];
    });
  }
});
