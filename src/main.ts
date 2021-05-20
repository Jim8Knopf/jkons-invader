import { EnemyCorp } from "./objects/enemy/enemyCorp";
import { getCanvas, getContext } from "./helper/gameHelper";
import { getShots, newPlayer } from "./helper/gameObjects";
import { getScaledTileSize, setCanvasSize } from "./helper/gameSettings";
import { displayForm, loadScoreboard } from "./helper/save";
import {
	playGameOverMusic,
	playTitleTheme,
	stopTitleTheme,
} from "./helper/soundHandler";
setCanvasSize();

let animation: number;
let animationActive: boolean = true;
let animationSpeed: number = 1 / 60;

let gameStarted: boolean = false;
const player = newPlayer("a", "d", " ");
const gameOverImage = new Image();
gameOverImage.src = "assets/img/game_over.png";
let enemyCorp = new EnemyCorp(16, 4);

loadScoreboard();
enemyCorp.corpAnimation();
init();

function reload() {
	enemyCorp = new EnemyCorp(16, 4);
	enemyCorp.corpAnimation();
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
function animate(): void {
	setTimeout(() => {
		player.handleInput();
		enemyCorp.corpAnimation();
		for (let j = 0; j < getShots().length; j++) {
			getShots()[j].shootAnimation();
		}
		if (animationActive) {
			animation = requestAnimationFrame(animate);
		}
	}, animationSpeed);
}

function input(keyboard: KeyboardEvent) {
	switch (keyboard.key) {
		case "r":
			if (!gameStarted) {
				playTitleTheme();
				gameStarted = true;
				animationActive = true;
				animate();
			}
			break;
		case "p":
			cancelAnimationFrame(animation);
			getContext().clearRect(
				0,
				0,
				getContext().canvas.width,
				getContext().canvas.height
			);
			stopTitleTheme();
			gameStarted = false;
			animationActive = false;
			enemyCorp = new EnemyCorp(16, 4);
			animate();

			break;

		default:
			gameStarted = false;
			break;
	}
}

export function init() {
	document.addEventListener("keyup", (keyboard) => {
		input(keyboard);
	});
}
export function stopGame() {
	animationActive = false;
	cancelAnimationFrame(animation);
	_renderGameOver();
	stopTitleTheme();
	playGameOverMusic();
	displayForm();
}
