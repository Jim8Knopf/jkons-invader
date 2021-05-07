import { Enemy } from "./enemy.js";
import { player } from "./player.js";
const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
window.onunload = unloadPage;
const context: CanvasRenderingContext2D = canvas.getContext(
	"2d"
) as CanvasRenderingContext2D;

// Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
canvas.width = 512;
canvas.height = 448;
context.imageSmoothingEnabled = false;
let p = new player(context);

// TODO array of enemies
const enemy: Enemy = new Enemy(context, 10, 10);
function animate(): void {
	context.clearRect(0, 0, canvas.width, canvas.height - p.size);
	enemy.moveEnemy();
	requestAnimationFrame(animate);
}

animate();
context.fillStyle = "white";
context.fillRect(10, 10, 2, 15);

function unloadPage() {
	alert("unload event detected!");
	document.removeEventListener("keydown", function (event) {
		p.move(event);
	});
	console.log("test");
	setTimeout(() => {}, 5000);
}
