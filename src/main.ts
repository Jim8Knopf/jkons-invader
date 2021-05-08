import { Enemy } from "./enemy.js";
import { player } from "./player.js";
import { EnemyHandler } from "./enemyHandler.js";

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
context.imageSmoothingEnabled = false;

const enemyHandler: EnemyHandler = new EnemyHandler();
// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created. 
const enemy: Enemy = new Enemy(context, -100 , -100);
const spaceBetween = enemy.getZoom() * enemy.getTileWidth();
for (let i = 0; i < 6; i++) {
	enemyHandler.addEnemy(new Enemy(context, i * spaceBetween , enemy.getTileHeight()));
	
}

function animate(): void {
	setTimeout(() => {
		enemyHandler.moveEnemies();
		requestAnimationFrame(animate);
	}, 1000 / 120);
}

animate();
