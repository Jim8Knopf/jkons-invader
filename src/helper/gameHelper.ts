import { initEnemyCorp, newPlayer } from "./gameObjects";
import { setCanvasSize } from "./gameSettings";
import { gameState, getGameOverState, initClickListener } from "./gameStates";
import { loadScoreboard } from "./save";

// * HTML Elements
const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = getCanvas().getContext(
	"2d"
) as CanvasRenderingContext2D;

// * Public Functions
/**
 * Initialize game
 */
export function init() {
	setCanvasSize();
	newPlayer("a", "d", " ");
	loadScoreboard();

	document.addEventListener("keyup", (keyboard) => {
		if (!getGameOverState()) {
			gameState(keyboard);
		}
	});

	initClickListener();
	initEnemyCorp();
}

// * Getter
/**
 * Get canvas.
 * @returns canvas
 */
export function getCanvas(): HTMLCanvasElement {
	return canvas;
}

/**
 * Get context to draw on it.
 * @returns context
 */
export function getContext(): CanvasRenderingContext2D {
	return context;
}
