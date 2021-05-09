import { Enemy } from "./enemy.js";
import { player } from "./player.js";
import { EnemyHandler } from "./enemyHandler.js";
import { shoot } from "./shoot.js";
import { GameSettings } from "./game-settings.js";

const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
window.onunload = unloadPage;
const context: CanvasRenderingContext2D = canvas.getContext(
	"2d"
) as CanvasRenderingContext2D;
const enemyHandler: EnemyHandler = new EnemyHandler();
const settings: GameSettings = new GameSettings(canvas);
context.imageSmoothingEnabled = false;

let shoots = new Array();
let players = new Array();
newPlayer("a", "d", " ");
newPlayer("j", "l", "i");

// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created.
// const p: player = new player(context);
const enemy: Enemy = new Enemy(context, shoots, enemyHandler, -100, -100);
const spaceBetween = enemy.zoom * enemy.tileWidth;
for (let i = 0; i < 8; i++) {
	enemyHandler.addEnemy(
		new Enemy(
			context,
			shoots,
			enemyHandler,
			i * spaceBetween * 1.2,
			enemy.tileHeight
		)
	);
}

animate();

function animate(): void {
	setTimeout(() => {
		enemyHandler.moveEnemies();
		for (let j = 0; j < shoots.length; j++) {
			shoots[j].shootMovement();
		}
		requestAnimationFrame(animate);
	}, 1000 / 120);
}

function newPlayer(left: string, right: string, fire: string) {
	const s = new shoot(context);
	shoots.push(s);
	let p: player = new player(context, s, left, right, fire);
	players.push(p);
}

function unloadPage() {
	alert("unload event detected!");
	document.removeEventListener("keydown", function (event) {
		for (let j = 0; j < players.length; j++) {
			players[j].move(event);
		}
	});
}
