import { EnemyCorp } from "../objects/enemy/enemyCorp";
import { getPlayers, getShots, newPlayer } from "./gameObjects";
import { displayForm, loadScoreboard, vanishForm, resetScore } from "./save";
import { getScaledTileSize, setCanvasSize } from "./gameSettings";

import {
	playGameOverMusic,
	playTitleTheme,
	stopTitleTheme,
} from "./soundHandler";

let animation: number;
let animationActive: boolean = true;
let animationSpeed: number = 1 / 60;

let gameStarted: boolean = false;
const gameOverImage = new Image();
gameOverImage.src = "assets/img/game_over.png";
let enemyCorp: EnemyCorp; // = new EnemyCorp(16, 4);
window.onunload = unloadPage;

const username: HTMLInputElement = <HTMLInputElement>(
	document.getElementById("username")
);
const startButton: HTMLButtonElement = <HTMLButtonElement>(
	document.getElementById("start")
);
const resetButton: HTMLButtonElement = <HTMLButtonElement>(
	document.getElementById("reset")
);
const stopButton: HTMLButtonElement = <HTMLButtonElement>(
	document.getElementById("stop")
);

/**
 * Initialize game
 */
export function init() {
	setCanvasSize();
	newPlayer("a", "d", " ");
	loadScoreboard();

	document.addEventListener("keyup", (keyboard) => {
		gameState(keyboard);
	});
	initClickListener();
	enemyCorp = new EnemyCorp(16, 4);
	enemyCorp.updateEnemyCorp();
}

export function getCanvas(): HTMLCanvasElement {
	return <HTMLCanvasElement>document.getElementById("jkonsInvader");
}

export function getContext(): CanvasRenderingContext2D {
	return getCanvas().getContext("2d") as CanvasRenderingContext2D;
}

export function getUsername() {
	return username.value;
}

/**
 * the function to start the game
 */
function start() {
	if (!gameStarted) {
		playTitleTheme();
		vanishForm();
		gameStarted = true;
		animationActive = true;
		resetScore();
		_update();
		startButton.innerHTML = "start";
		startButton.disabled = true;
		stopButton.disabled = false;
		resetButton.disabled = false;
	}
}
/**
 * the function to pauses the game
 */
function pause(): void {
	cancelAnimationFrame(animation);
	animationActive = false;
	gameStarted = false;
	startButton.innerHTML = "continue";
	startButton.disabled = false;
	stopButton.disabled = true;
}
/**
 * the function resets the game
 */
function reset() {
	resetScore();
	getContext().clearRect(0, 0, getCanvas().width, getCanvas().height);
	enemyCorp = new EnemyCorp(16, 4);
	enemyCorp.updateEnemyCorp();
	animationActive = false;
	gameStarted = false;
	startButton.innerHTML = "start";
	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = true;
}

/**
 * Stops the game.
 */
export function stopGame() {
	animationActive = false;
	cancelAnimationFrame(animation);
	_renderGameOver();
	stopTitleTheme();
	playGameOverMusic();
	displayForm();
}

function gameState(keyboard: KeyboardEvent) {
	switch (keyboard.key) {
		case "r":
			if (!gameStarted) {
				start();
			}
			break;
		case "p":
			pause();
			break;

		default:
			gameStarted = false;
			break;
	}
}
/**
 * Updates game animations.
 */
function _update(): void {
	setTimeout(() => {
		_updatePlayers();
		_updateShots();
		enemyCorp.updateEnemyCorp();

		if (animationActive) {
			animation = requestAnimationFrame(_update);
		}
	}, animationSpeed);
}

const players = getPlayers();
function _updatePlayers() {
	players.forEach((player) => {
		player.handleInput();
	});
}

const shots = getShots();
function _updateShots() {
	for (let j = 0; j < shots.length; j++) {
		shots[j].animateShot();
	}
}

function _renderGameOver() {
	let x = (getCanvas().width - (71 * getScaledTileSize()) / 9) / 2;
	let y = (getCanvas().height - (33 * getScaledTileSize()) / 9) / 2;
	getContext().drawImage(
		gameOverImage,
		x,
		y,
		(71 * getScaledTileSize()) / 9,
		(33 * getScaledTileSize()) / 9
	);
}

/**
 * initClickListener
 */
function initClickListener() {
	startButton.addEventListener("click", start);
	stopButton.addEventListener("click", pause);
	resetButton.addEventListener("click", reset);
}

/**
 * Removes event listener.
 */
function unloadPage() {
	alert("unload event detected!");
	startButton.removeEventListener("click", start);
	stopButton.removeEventListener("click", pause);
	resetButton.removeEventListener("click", reset);
	// players.forEach((player) => {
	// 	document.removeEventListener("keydown", function (event) {
	// 		// p.move(event);
	// 	});
	// });
	setTimeout(function () {
		console.log("after");
	}, 500);
}
