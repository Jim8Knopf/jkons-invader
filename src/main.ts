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
let shoots = new Array();
let players = new Array();
let gameStarted: boolean = false;
let actualScore: number = 0;
let scoreElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("score")
);
// shoots.push(s);
const p: Player = new Player(context, settings.zoom, "a", "d", " ");
// players.push(p);

let animationSpeed: number = 1 / 60;
// newPlayer("a", "d", " ");
// ! Should not be, but dummy enemy for zoom and tile size, till game settings and tile config is created.
// const s = new shoot(context);
// const player: Player = new Player(context, s, settings.zoom, "a", "d", " ");

const enemy: Enemy = new Enemy(context, enemyHandler, 1, 0, 0);
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
		new Enemy(context, enemyHandler, settings.zoom, i * spaceBetween, 0)
	);
}

export function gameOver() {}

function animate(): void {
	setTimeout(() => {
		enemyHandler.moveEnemies();
		p.move();
		for (let j = 0; j < shoots.length; j++) {
			shoots[j].shootMovement();
		}
		requestAnimationFrame(animate);
	}, animationSpeed);
}

export function score() {
	actualScore++;
	// scoreElement.value = actualScore.toString();
}

function newPlayer(left: string, right: string, fire: string) {}

init();
