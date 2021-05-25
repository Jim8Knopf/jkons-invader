import { getAnimation, setAnimationState, update } from "./gameAnimations";
import { getContext, getCanvas } from "./gameHelper";
import { getEnemyCorp, getPlayers, initEnemyCorp } from "./gameObjects";
import { getScaledTileSize } from "./gameSettings";
import { vanishForm, resetScore, loadScoreboard, displayForm } from "./save";
import {
	playTitleTheme,
	stopTitleTheme,
	playGameOverMusic,
	stopGameOverMusic,
} from "./soundHandler";

// * HTML Elements
const _startButton: HTMLButtonElement = <HTMLButtonElement>(
	document.getElementById("start")
);
const _resetButton: HTMLButtonElement = <HTMLButtonElement>(
	document.getElementById("reset")
);
const _stopButton: HTMLButtonElement = <HTMLButtonElement>(
	document.getElementById("stop")
);
const _playerGuideGif: HTMLImageElement = <HTMLImageElement>(
	document.getElementById("playerGuide")
);

// On window new load, remove event listener
window.onunload = _unloadPage;

let _gameStarted: boolean = false;
let _isGameOver: boolean = false;
const _gameOverImage = new Image();
_gameOverImage.src = "assets/img/game_over.png";

// * Public Functions
export function gameState(keyboard: KeyboardEvent) {
	switch (keyboard.key) {
		case " ":
			if (!_gameStarted) {
				_start();
			}
			break;
		case "p":
			_pause();
			break;

		default:
			break;
	}
}

// ! Unpause game doesn't work with gamepad, because gamepad input must be in game loop and when cancel animation frame game loop is left.
export function gamepadChangeState() {
	const gp = (navigator.getGamepads ? navigator.getGamepads() : [])[0];
	// Configured for Xbox One Controller

	// Exit when no controller is connected
	if (!gp) {
		return;
	}
	// if (gp.buttons[9].pressed) {
	// 	_gameStarted ? _pause() : _start();
	// }

	while (!_gameStarted) {
		if (gp.connected) {
			_start();
		}
	}
}

/**
 * Stops the game.
 */
export function stopGame() {
	_stopButton.disabled = true;
	_isGameOver = true;
	setAnimationState(false);
	cancelAnimationFrame(getAnimation());
	_renderGameOver();
	stopTitleTheme();
	playGameOverMusic();
	loadScoreboard();
	displayForm();
}

/**
 * Initialize click events.
 */
export function initClickListener() {
	_startButton.addEventListener("click", _start);
	_stopButton.addEventListener("click", _pause);
	_resetButton.addEventListener("click", _reset);
}

// * Getter
/**
 * Tells if the game is over or not.
 * @returns _isGameOver
 */
export function getGameOverState() {
	return _isGameOver;
}

// * Private Functions
/**
 * Starts the game.
 */
function _start() {
	if (!_gameStarted) {
		_playerGuideGif.src = "assets/img/player-guide.png";
		playTitleTheme();
		vanishForm();
		_gameStarted = true;
		setAnimationState(true);
		resetScore();
		update();
		_startButton.innerHTML = "start";
		_startButton.disabled = true;
		_stopButton.disabled = false;
		_resetButton.disabled = false;
	}
}
/**
 * Pauses the game.
 */
function _pause(): void {
	cancelAnimationFrame(getAnimation());
	setAnimationState(false);
	_gameStarted = false;
	_startButton.innerHTML = "continue";
	_startButton.disabled = false;
	_stopButton.disabled = true;
}

/**
 * Resets the game.
 */
function _reset() {
	_playerGuideGif.src = "assets/img/player-guide.gif";
	stopGameOverMusic();
	vanishForm();
	resetScore();
	getContext().clearRect(0, 0, getCanvas().width, getCanvas().height);
	initEnemyCorp();
	getEnemyCorp().updateEnemyCorp();
	setAnimationState(false);
	_gameStarted = false;
	_isGameOver = false;
	getPlayers().forEach((player) => {
		player.resetLife();
	});
	_startButton.innerHTML = "start";
	_startButton.disabled = false;
	_stopButton.disabled = true;
	_resetButton.disabled = true;
}

/**
 * Renders the game over text.
 */
function _renderGameOver() {
	const gameOverSize = 16;
	const gameOverBorder = 16;
	const gameOverWidth = getScaledTileSize() * gameOverSize;
	const gameOverX = getCanvas().width / 2 - gameOverWidth / 2;

	const gameOverHeight = (getScaledTileSize() * gameOverSize) / 2;
	const gameOverY = getCanvas().height / 2 - gameOverHeight / 2;
	getContext().fillStyle = "rgb(50, 0, 25)";
	getContext().fillRect(
		gameOverX - gameOverBorder,
		gameOverY - gameOverBorder,
		gameOverWidth + gameOverBorder * 2,
		gameOverHeight + gameOverBorder * 2
	);
	getContext().drawImage(
		_gameOverImage,
		gameOverX,
		gameOverY,
		gameOverWidth,
		gameOverHeight
	);
}

/**
 * Removes event listener.
 */
function _unloadPage() {
	alert("unload event detected!");
	_startButton.removeEventListener("click", _start);
	_stopButton.removeEventListener("click", _pause);
	_resetButton.removeEventListener("click", _reset);

	setTimeout(function () {
		console.log("after");
	}, 500);
}
