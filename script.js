const width = 20;
const height = 20;

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(${width},1fr)`;

const snake = [5, 4, 3, 2, 1, 0];
let head = snake[0];
let direction = "right";
let intervalID;
let isGameOver = false;
let speed = 200;

let leftBound = [];
let rightBound = [];

for (let i = 1; i <= height; i++) {
  rightBound.push(i * width);
}
console.log(rightBound);

for (let i = 1; i <= height; i++) {
  leftBound.push(i * width - 1);
}
console.log(rightBound);

function createBoard() {
  for (let i = 0; i < width * height; i++) {
    const div = document.createElement("div");
    //div.innerHTML = i;
    board.appendChild(div);
  }
  snakeColor();
  appleRandom();
}

function snakeColor() {
  const divs = board.querySelectorAll("div");
  divs.forEach((div) => div.classList.remove("snake", "head"));
  snake.forEach((num) => divs[num].classList.add("snake"));
  divs[head].classList.add("head");
}
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      moveSnake("up");
      break;
    case "ArrowDown":
      moveSnake("down");
      break;
    case "ArrowRight":
      moveSnake("right");
      break;
    case "ArrowLeft":
      moveSnake("left");
      break;
  }
  autoMove();
});

function autoMove() {
  clearInterval(intervalID);
  intervalID = setInterval(() => moveSnake(direction), speed);
}

function moveSnake(dir) {
  if (isGameOver) {
    return;
  }

  const divs = board.querySelectorAll("div");
  if (dir === "up") {
    head -= width;
    if (!divs[head]) {
      GameOver();
      return;
    }
  } else if (dir === "down") {
    head += width;
    if (!divs[head]) {
      GameOver();
      return;
    }
  } else if (dir === "right") {
    if (leftBound.includes(head)) {
      GameOver();
      return;
    }
    head++;
  } else if (dir === "left") {
    if (rightBound.includes(head)) {
      GameOver();
      return;
    }
    head--;
  }
  if (snake.includes(head)) {
    GameOver();
  }
  direction = dir;
  snake.unshift(head);
  if (head === random) {
    speed -=10;
    appleRandom();
  } else {
    snake.pop();
  }
  snakeColor();
}
function startAuto() {
  clearInterval(intervalID);
  intervalID = setInterval(() => moveSnake(direction), 200);
}
function sound(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.volume = 0.5;
  audio.play();
}

function appleRandom() {
  random = Math.floor(Math.random() * width * height);

  if (snake.includes(random)) {
    appleRandom();
  } else {
    const divs = board.querySelectorAll("div");
    divs.forEach((div) => div.classList.remove("apple"));
    divs[random].classList.add("apple");
  }
}

function GameOver() {
  isGameOver = true;
  clearInterval(intervalID);

  sound("gameover.mp3");

  setTimeout(() => {
    location.reload();
    alert("GAME OVER");
  }, 1000);
}
createBoard();
