import { EnemyCorp } from "./enemyCorp";
import { getCanvas, getContext } from "./gameHelper";
import { getShots, newPlayer } from "./gameObjects";
import { getScaledTileSize, setCanvasSize } from "./gameSettings";
import { displayForm, loadScoreboard } from "./save";
import {
	playGameOverMusic,
	playTitleTheme,
	stopTitleTheme,
} from "./soundHandler";
setCanvasSize();

let animation: number;
let animationActive: boolean = true;
let animationSpeed: number = 1 / 60;

let gameStarted: boolean = false;

const player = newPlayer("a", "d", " ");
const enemyCorp = new EnemyCorp(16, 4);
export function init() {
	document.addEventListener("keyup", (keyboard) => {
		switch (keyboard.key) {
			case "r":
				if (gameStarted === false) {
					playTitleTheme();
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
loadScoreboard();
enemyCorp.corpAnimation();
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
export function stopGame() {
	animationActive = false;
	cancelAnimationFrame(animation);
	_renderGameOver();
	stopTitleTheme();
	playGameOverMusic();
	displayForm();
}
const gameOverImage = new Image();
gameOverImage.src = "assets/img/game_over.png";
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

init();
