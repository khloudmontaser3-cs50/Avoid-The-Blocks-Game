const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerPos = 180;
let score = 0;
let gameOver = false;

// تحريك اللاعب
document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 20;
  }
  if (e.key === "ArrowRight" && playerPos < 360) {
    playerPos += 20;
  }
  player.style.left = playerPos + "px";
});

// إنشاء بلوكات
function createBlock() {
  if (gameOver) return;

  const block = document.createElement("div");
  block.classList.add("block");
  block.style.left = Math.floor(Math.random() * 10) * 40 + "px";
  gameArea.appendChild(block);

  let blockTop = 0;
  let fall = setInterval(() => {
    if (gameOver) {
      clearInterval(fall);
      return;
    }
    blockTop += 5;
    block.style.top = blockTop + "px";

    // كشف التصادم
    if (
      blockTop > 450 &&
      parseInt(block.style.left) === playerPos
    ) {
      clearInterval(fall);
      gameOver = true;
      alert("💥 Game Over! سكورك: " + score);
    }

    // زيادة السكور لو عدى
    if (blockTop > 500) {
      clearInterval(fall);
      block.remove();
      score++;
      scoreDisplay.textContent = score;
    }
  }, 50);
}

// توليد بلوك كل ثانية
setInterval(() => {
  if (!gameOver) createBlock();
}, 1000);