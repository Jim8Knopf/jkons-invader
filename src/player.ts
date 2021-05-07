export class player {
	private _size = 40;
	private _playerSpeed = 5;
	private _context;
	public positionH;
	public positionW;
	private base_image = new Image();
	constructor(context: CanvasRenderingContext2D) {
		const that = this;
		this._context = context;
		this.positionH = context.canvas.height - this._size;
		this.positionW = (context.canvas.width - this._size) / 2;
		this.base_image.src = "../img/iro.png";
		this.base_image.onload = function () {
			context.drawImage(
				that.base_image,
				that.positionW,
				that.positionH,
				that._size,
				that._size
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
		this._context.clearRect(
			this.positionW - this._playerSpeed,
			this.positionH,
			this._context.canvas.width,
			this._context.canvas.height
		);
		this._context.drawImage(
			this.base_image,
			this.positionW,
			this.positionH,
			this._size,
			this._size
		);
	}
}
