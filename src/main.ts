import { Enemy } from "./enemy.js";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

// Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
canvas.width = 512;
canvas.height = 448;
context.imageSmoothingEnabled = false;

// TODO array of enemies
const enemy: Enemy = new Enemy(context, 10, 10);
function animate(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
  enemy.moveEnemy();
  requestAnimationFrame(animate);
}

animate();
