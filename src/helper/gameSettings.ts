import { getCanvas, getContext } from "./gameHelper";

let zoom: number = 1;
let size: number = 0;
let enemyGap: number;
let downSpeed: number;
let _scaledTileSize: number = 0;
const _tileSize: number = 9;

// game settings
const enemys: number = 18;
const rows: number = 4;
const newEnemys: number = 12;

export function setCanvasSize(): void {
	_resizeCanvas();

	// Webkit/Blink will fire this on load, but Gecko doesn't.
	window.addEventListener("resize", () => {
		_resizeCanvas();
	});
	downSpeed = (getScaledTileSize() * 2) / 3;
	enemyGap = getScaledTileSize() / 6;
}

export function getTileSize(): number {
	return _tileSize;
}

export function getScaledTileSize(): number {
	return _scaledTileSize;
}

function _resizeCanvas(): void {
	const _canvas = getCanvas();

	let body: HTMLElement = document.body;
	let html = document.documentElement;

	let height = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);
	let width =
		Math.max(
			body.scrollWidth,
			body.offsetWidth,
			html.clientWidth,
			html.scrollWidth,
			html.offsetWidth
		) - 500;
	let canvasSize = width > height ? height : width;
	// height -= 5;
	size = 225 * zoom;
	// console.log(body.clientWidth);
	// console.log(body.offsetWidth);
	// console.log(body.scrollWidth);

	// Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
	_canvas.width = canvasSize;
	_canvas.height = canvasSize;
	(
		document.getElementById("pageLayout") as HTMLDivElement
	).style.gridTemplateColumns = `20% ${canvasSize}px auto`;
	_scaledTileSize = canvasSize / (getEnemys() + 8);
	getContext().imageSmoothingEnabled = false;
}

export function getEnemys(): number {
	return enemys;
}
export function getRows(): number {
	return rows;
}
export function getNewEnemys(): number {
	return newEnemys;
}
export function getEnemyGap(): number {
	return enemyGap;
}
export function getDownSpeed(): number {
	return downSpeed;
}
