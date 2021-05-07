export class player {
	constructor(canvas: HTMLCanvasElement) {
		const size = 40;
		const playerSpeed = 5;
		const context: CanvasRenderingContext2D = canvas.getContext(
			"2d"
		) as CanvasRenderingContext2D;
		const position_h = canvas.height - size;
		let position_w = (canvas.width - size) / 2;
		let base_image = new Image();
		base_image.src = "../img/iro.png";
		base_image.onload = function () {
			context.drawImage(base_image, position_w, position_h, size, size);
		};
		document.addEventListener("keydown", function (e) {
			console.log(e.key);
			if (e.key === "a") position_w -= playerSpeed; // ArrayUp
			if (e.key === "d") position_w += playerSpeed;
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			context.drawImage(base_image, position_w, position_h, size, size);
		});
	}
	public move(event: KeyboardEvent) {}
}
