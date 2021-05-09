export class shoot {
	public positionX: number;
	public positionY: number;
	private _context: CanvasRenderingContext2D;
	private _shootLength: number = 10;
	private _shootThickness: number = 5;
	private _shootSpeed: number = 10;
	constructor(context: CanvasRenderingContext2D) {
		this._context = context;
		this.positionX = 0;
		this.positionY = 0;
	}
	/**
	 * shoot if there is no actual shoot an the field
	 */
	public shoot(positionX: number, positionY: number) {
		if (this.positionY <= 0) {
			this._shootClear();
			this.positionX = positionX;
			this.positionY = positionY;
		}
	}
	/**
	 * hit should be called when anything is hitten by the shot
	 */
	public hit() {
		this._shootClear();
		this.positionY = 0;
	}
	/**
	 * this function checks if the shoot is in the field
	 * than it clears the old shoot
	 * than it moves the shoot up and paint it
	 */
	public shootMovement() {
		if (this.positionY <= 0) {
			this.positionY = 0;
			// this.clear();
			return;
		}
		this._shootClear();
		this.positionY -= this._shootSpeed;
		this._shootRender();
	}

	/**
	 * getPosition
	 */
	public getPosition(): Array<number> {
		let position = new Array();
		position.push(this.positionX);
		position.push(this.positionY);
		return position;
	}

	/**
	 * shootRender
	 */
	private _shootRender() {
		this._context.fillStyle = "red";
		this._context.fillRect(
			this.positionX - this._shootThickness / 2,
			this.positionY - this._shootLength,
			this._shootThickness,
			this._shootLength
		);
	}
	/**
	 * this function clears the current shoot
	 */
	private _shootClear() {
		this._context.clearRect(
			this.positionX - this._shootThickness / 2,
			this.positionY - this._shootLength,
			this._shootThickness + 1,
			this._shootLength + 1
		);
	}
}
