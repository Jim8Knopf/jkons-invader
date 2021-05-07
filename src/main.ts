import { player } from "./player.js";
const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
	document.getElementById("jkonsInvader")
);
const context: CanvasRenderingContext2D = canvas.getContext(
	"2d"
) as CanvasRenderingContext2D;

// Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
canvas.width = 512;
canvas.height = 448;
context.fillStyle = "white";
context.fillRect(10, 10, 2, 15);
let p = new player(context);

function onUnload() {
	alert("test");
}
