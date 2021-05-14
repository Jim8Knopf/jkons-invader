const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = getCanvas().getContext(
	"2d"
) as CanvasRenderingContext2D;

export function getCanvas() {
	return canvas;
}

export function getContext() {
	return context;
}
