export class player {
	public size: number = 40;
	private _playerSpeed: number = 5;
	private _context: CanvasRenderingContext2D;
	private _baseImage = new Image();
	public positionH: number;
	public positionW: number;
	constructor(context: CanvasRenderingContext2D) {
		const that = this;
		this._context = context;
		this.positionH = context.canvas.height - this.size;
		this.positionW = (context.canvas.width - this.size) / 2;
		this._baseImage.src = "../img/iro.png";
		this._baseImage.onload = function () {
			context.drawImage(
				that._baseImage,
				that.positionW,
				that.positionH,
				that.size,
				that.size
			);
		};
		document.addEventListener("keydown", function (event) {
			that.move(event);
		});
	}
	public move(event: any) {
		console.log(event.key);
		if (event.key === "a") this.positionW -= this._playerSpeed;
		if (event.key === "d") this.positionW += this._playerSpeed;
		if (event.key === "w") {
			this.shoot;
			console.log("ping");
			this._context.fillStyle = "red";
			this._context.fillRect(100, 100, 5, 10);
		}
		this._context.clearRect(
			this.positionW - this._playerSpeed,
			this.positionH,
			this._context.canvas.width,
			this._context.canvas.height
		);
		this._context.drawImage(
			this._baseImage,
			this.positionW,
			this.positionH,
			this.size,
			this.size
		);
	}
	public shoot() {
		console.log("peng");
		this._context.fillStyle = "red";
		this._context.fillRect(100, 100, 5, 10);
	}
}
