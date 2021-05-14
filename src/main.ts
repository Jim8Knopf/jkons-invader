import { getCanvas, getContext } from "./gameHelper";
import { getEnemyRow, getShots, initEnemyRows, newPlayer } from "./gameObjects";
import { getScaledTileSize, setCanvasSize } from "./gameSettings";
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

function animate(): void {
	setTimeout(() => {
		player.handleInput();
		for (let j = 0; j < getEnemyRow().length; j++) {
			getEnemyRow()[j].moveEnemyRow();
		}
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

let audioType: string;
let audio = new Audio();
if (audio.canPlayType("audio/mp3")) {
	audioType = ".mp3";
} else {
	audioType = ".wav";
}

function playAudio() {
	let audio = new Audio("/assets/sounds/jkons-invader_title_theme" + audioType);
	audio.loop = true;
	audio.volume = 0.05;

	audio.play();
}

export function stopGame() {
	animationActive = false;
	cancelAnimationFrame(animation);
	_renderGameOver();
}

function _renderGameOver() {
	let fontsize: number = 4 * getScaledTileSize();
	let x = (getCanvas().width - fontsize * 5) / 2;
	let y = getCanvas().height / 2;
	getContext().font = `${fontsize}px Arial`;
	getContext().fillText("Game Over", x, y);
}

init();
