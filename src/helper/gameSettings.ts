import { getCanvas, getContext } from "./gameHelper";

let zoom: number = 1;
let size: number = 0;
const _tileSize: number = 9;

export function setCanvasSize() {
	_resizeCanvas();

	// Webkit/Blink will fire this on load, but Gecko doesn't.
	window.addEventListener("resize", () => {
		_resizeCanvas();
	});
}

export function getTileSize(): number {
	return _tileSize;
}

let _scaledTileSize: number = 0;
export function getScaledTileSize(): number {
	return _scaledTileSize;
}

function _resizeCanvas() {
	const _canvas = getCanvas();
	// resize canvas if the window size reached a specific size
	if (innerHeight <= 450) {
		zoom = 1;
	} else if (innerHeight <= 690 || innerWidth <= 675) {
		zoom = 2;
	} else if (innerHeight <= 915 || innerWidth <= 900) {
		zoom = 3;
	} else {
		zoom = 4;
	}

	size = 225 * zoom;
	// Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
	_canvas.width = size;
	_canvas.height = size;
	_scaledTileSize = _tileSize * zoom;
	getContext().imageSmoothingEnabled = false;
}
