const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = getCanvas().getContext(
	"2d"
) as CanvasRenderingContext2D;

const username: HTMLInputElement = <HTMLInputElement>(
	document.getElementById("username")
);

export function getCanvas() {
	return canvas;
}

export function getContext() {
	return context;
}

export function getUsername() {
	return username.value;
}
