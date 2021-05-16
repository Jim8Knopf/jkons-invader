import { EnemyCorp } from "./enemyCorp";
import { getCanvas, getContext } from "./gameHelper";
import { getShots, newPlayer } from "./gameObjects";
import { getScaledTileSize, getTileSize, setCanvasSize } from "./gameSettings";
import { playTitleTheme } from "./soundHandler";
setCanvasSize();

// timer(7000, 7000).subscribe(() => {
// 	enemyRows.push(new EnemyRow(getShots(), 0, 0));
// 	for (let i = 0; i < enemyRows.length; i++) {
// 		if (i === enemyRows.length - 1) {
// 			enemyRows[i].createEnemyRow(10, 0, 0, 0);
// 		}
// 	}
// });

let animation: number;
let animationActive: boolean = true;
let animationSpeed: number = 1 / 60;

let gameStarted: boolean = false;
let actualScore: number = 0;

const player = newPlayer("a", "d", " ");
const enemyCorp = new EnemyCorp(16, 2);
export function init() {
	document.addEventListener("keyup", (keyboard) => {
		switch (keyboard.key) {
			case "r":
				if (gameStarted === false) {
					gameStarted = true;
					playTitleTheme();
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

enemyCorp.corpAnimation();
function animate(): void {
	setTimeout(() => {
		player.handleInput();
		enemyCorp.corpAnimation();
		// for (let j = 0; j < enemyCorp.getEnemyCorp().length; j++) {
		// 	enemyCorp.getEnemyCorp()[j].moveEnemyRow();
		// }
		for (let j = 0; j < getShots().length; j++) {
			getShots()[j].shootAnimation();
		}
		if (animationActive) {
			animation = requestAnimationFrame(animate);
		}
	}, animationSpeed);
}

export function score() {
	actualScore++;
	// scoreElement.value = actualScore.toString();
}

export function stopGame() {
	animationActive = false;
	cancelAnimationFrame(animation);
	_renderGameOver();
}
const gameOverImage = new Image();
gameOverImage.src = "assets/img/game_over.png";
function _renderGameOver() {
	let fontsize: number = 4 * getScaledTileSize();
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
