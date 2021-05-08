import { shoot } from "./shoot.js";

export class player {
	public size: number = 40;
	private _playerSpeed: number = 5;
	private _context: CanvasRenderingContext2D;
	private _baseImage = new Image();
	public shoot: shoot;
	public positionX: number;
	public positionY: number;
	constructor(context: CanvasRenderingContext2D) {
		const that = this;
		this._context = context;
		this.shoot = new shoot(this._context);
		this.positionY = context.canvas.height - this.size;
		this.positionX = (context.canvas.width - this.size) / 2;
		this._baseImage.src = "../img/iro.png";
		this._baseImage.onload = function () {
			context.drawImage(
				that._baseImage,
				that.positionX,
				that.positionY,
				that.size,
				that.size
			);
		};
		// ! add keypress listener
		document.addEventListener("keydown", (event) => {
			that.move(event);
		});
	}
	/**
	 * it checks the KeyboardEvent and activate the shoot ore moves
	 * @param event is the KeyboardEvent
	 */
	public move(event: KeyboardEvent) {
		console.log(event.key);
		if (event.key === "a")
			// moves left but not out of the screen
			this.positionX =
				this.positionX - this._playerSpeed >= 0
					? this.positionX - this._playerSpeed
					: 0;
		if (event.key === "d")
			// moves right but not out of the screen
			this.positionX =
				this.positionX + this.size <= this._context.canvas.width
					? this.positionX + this._playerSpeed
					: this.positionX;
		if (event.key === " ") {
			// activates the shoot if possible
			this.shoot.shoot(this.positionX + this.size / 2, this.positionY);
		}
		this._context.clearRect(
			this.positionX - this._playerSpeed,
			this.positionY,
			this._context.canvas.width,
			this._context.canvas.height
		);
		this._context.drawImage(
			this._baseImage,
			this.positionX,
			this.positionY,
			this.size,
			this.size
		);
	}
}
