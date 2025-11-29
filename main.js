const board = document.querySelector(".board");
const cols = 62;
const rows = 28;

// state
let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let nextDirection = direction;
let food = null;

// compute block size dynamically so it fits board
function blockSize() {
  return Math.floor(Math.min(board.clientWidth / cols, board.clientHeight / rows));
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };
}

function draw() {
  // clear
  board.innerHTML = "";

  const size = blockSize();
  board.style.gridTemplateColumns = `repeat(${cols}, ${size}px)`;
  board.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;

  // draw food
  if (food) {
    const f = document.createElement("div");
    f.className = "food";
    f.style.width = f.style.height = size + "px";
    board.appendChild(f);
    // compute position using grid — use CSS order
    f.style.gridColumnStart = food.x + 1;
    f.style.gridRowStart = food.y + 1;
  }

  // draw snake
  snake.forEach((seg, i) => {
    const s = document.createElement("div");
    s.className = "snake";
    s.style.width = s.style.height = size + "px";
    s.style.gridColumnStart = seg.x + 1;
    s.style.gridRowStart = seg.y + 1;
    board.appendChild(s);
  });
}

function move() {
  direction = nextDirection;

  const head = snake[0];
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };

  // wrap or game over if you prefer
  if (newHead.x < 0) newHead.x = cols - 1;
  if (newHead.x >= cols) newHead.x = 0;
  if (newHead.y < 0) newHead.y = rows - 1;
  if (newHead.y >= rows) newHead.y = 0;

  // collision with self → reset (simple)
  if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    snake = [{ x: 5, y: 5 }];
    placeFood();
    return;
  }

  snake.unshift(newHead);

  // eat food?
  if (food && newHead.x === food.x && newHead.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }
}

window.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  if (key === "w" && direction.y === 0) nextDirection = { x: 0, y: -1 };
  if (key === "s" && direction.y === 0) nextDirection = { x: 0, y: 1 };
  if (key === "a" && direction.x === 0) nextDirection = { x: -1, y: 0 };
  if (key === "d" && direction.x === 0) nextDirection = { x: 1, y: 0 };
});


