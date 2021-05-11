import { Enemy } from "./enemy";
import { Player } from "./player";
import { EnemyHandler } from "./enemyHandler";
import { Shot } from "./shot";
import { GameSettings } from "./game-settings";
import { BehaviorSubject, Observable } from "rxjs";

const subject = new BehaviorSubject(23);
const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = canvas.getContext(
	"2d"
) as CanvasRenderingContext2D;
const enemyHandler: EnemyHandler = new EnemyHandler();
const settings: GameSettings = new GameSettings(canvas);
context.imageSmoothingEnabled = false;

subject.subscribe(console.log);
let shots = new Array();
let players = new Array();
let gameStarted: boolean = false;
let actualScore: number = 0;
let scoreElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("score")
);
let animationSpeed: number = 1 / 60;
// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created.
const player = newPlayer("a", "d", " ");

const enemy: Enemy = new Enemy(context, shots, enemyHandler, 1, 0, 0);
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
		new Enemy(context, shots, enemyHandler, settings.zoom, i * spaceBetween, 0)
	);
}

export function gameOver() {}

function animate(): void {
	setTimeout(() => {
		player.move();
		enemyHandler.moveEnemies();
		for (let j = 0; j < shots.length; j++) {
			shots[j].shootMovement();
		}
		requestAnimationFrame(animate);
	}, animationSpeed);
}

export function score() {
	actualScore++;
	// scoreElement.value = actualScore.toString();
}

function newPlayer(left: string, right: string, fire: string): Player {
	const shot: Shot = new Shot(context);
	const player: Player = new Player(
		context,
		shot,
		settings.zoom,
		left,
		right,
		fire
	);

	shots.push(shot);
	players.push(player);

	return player;
}

init();
