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
let gameStarted: boolean = false;
let actualScore: number = 0;
let scoreElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("score")
);
newPlayer("j", "l", "i");
newPlayer("a", "d", " ");
// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created.
const enemy: Enemy = new Enemy(context, shoots, enemyHandler, 1, 0, 0);
const spaceBetween = settings.zoom * enemy.tileWidth;

export function init() {
	document.addEventListener("keyup", (keyboard) => {
		switch (keyboard.key) {
			case "r":
				if (gameStarted === false) {
					gameStarted = true;
					animate();
				} else {
					init();
				}
				break;

			default:
				gameStarted = false;
				break;
		}
	});
}
for (let i = 0; i < 20; i++) {
	enemyHandler.addEnemy(
		new Enemy(context, shoots, enemyHandler, settings.zoom, i * spaceBetween, 0)
	);
}

export function gameOver() {}

function animate(): void {
	setTimeout(() => {
		enemyHandler.moveEnemies();
		for (let j = 0; j < shoots.length; j++) {
			shoots[j].shootMovement();
		}
		requestAnimationFrame(animate);
	}, 0);
}

export function score() {
	actualScore++;
	scoreElement.value = actualScore.toString();
}

function newPlayer(left: string, right: string, fire: string) {
	const s = new shoot(context);
	shoots.push(s);
	let p: player = new player(context, s, settings.zoom, left, right, fire);
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

init();
