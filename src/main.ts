import { Enemy } from "./enemy";
import { Player } from "./player";
import { EnemyRow } from "./enemyRow";
import { Shot } from "./shot";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { getCanvas, getContext } from "./gameHelper";
import { setCanvasSize } from "./gameSettings";

// timer(7000, 7000).subscribe(() => {
// 	enemyRows.push(new EnemyRow(shots, 0, 0));
// 	for (let i = 0; i < enemyRows.length; i++) {
// 		if (i === enemyRows.length - 1) {
// 			enemyRows[i].createEnemyRow(10, 0, 0, 0);
// 		}
// 	}
// });

setCanvasSize();
let animationSpeed: number = 1 / 60;

let shots = new Array();
let players = new Array();
let enemyRows = new Array();
let gameStarted: boolean = false;
let actualScore: number = 0;
let scoreElement: HTMLOutputElement = <HTMLOutputElement>(
	document.getElementById("score")
);

const player = newPlayer("a", "d", " ");
initEnemyRows();
export function init() {
	document.addEventListener("keyup", (keyboard) => {
		switch (keyboard.key) {
			case "r":
				if (gameStarted === false) {
					gameStarted = true;
					playAudio();
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

export function gameOver() {}

// TODO Maybe changing to enemy rows

function animate(): void {
	// ? Is this a good idea ?

	setTimeout(() => {
		player.handleInput();
		for (let j = 0; j < enemyRows.length; j++) {
			enemyRows[j].moveEnemyRow();
		}
		for (let j = 0; j < shots.length; j++) {
			shots[j].shootAnimation();
		}
		requestAnimationFrame(animate);
	}, animationSpeed);
}

export function score() {
	actualScore++;
	// scoreElement.value = actualScore.toString();
}

function newPlayer(left: string, right: string, fire: string): Player {
	const shot: Shot = new Shot(getContext());
	const player: Player = new Player(getContext(), shot, left, right, fire, 4);

	shots.push(shot);
	players.push(player);

	return player;
}

function initEnemyRows() {
	for (let i = 0; i < 3; i++) {
		enemyRows.push(new EnemyRow(shots, 15, 0, i * 36, 2));
	}
}

let audioType: string;
let audio = new Audio();
if (audio.canPlayType("audio/mp3")) {
	audioType = ".mp3";
} else {
	audioType = ".wav";
}

//Function to play the exact file format
function playAudio() {
	var audio = new Audio(
		"../assets/sounds/jkons-invader_title_theme" + audioType
	);
	audio.play();
}

init();
