export class Shot {
	private _positionX: number;
	private _positionY: number;
	private _context: CanvasRenderingContext2D;
	private _shootLength: number = 10;
	private _shootThickness: number = 5;
	private _shootSpeed: number = 20;
	constructor(context: CanvasRenderingContext2D) {
		this._context = context;
		this._positionX = 0;
		this._positionY = 0;
	}
	/**
	 * shoot if there is no actual shoot an the field
	 */
	public shoot(positionX: number, positionY: number) {
		if (this._positionY <= 0) {
			this._clearShoot();
			this._positionX = positionX;
			this._positionY = positionY;
		}
	}
	/**
	 * hit should be called when anything is hitten by the shot
	 */
	public hit() {
		this._clearShoot();
		this._positionY = 0;
	}
	/**
	 * this function checks if the shoot is in the field
	 * than it clears the old shoot
	 * than it moves the shoot up and paint it
	 */
	public shootMovement() {
		if (this._positionY <= 0) {
			this._positionY = 0;
			this._clearShoot();
			return;
		}
		this._clearShoot();
		this._positionY -= this._shootSpeed;
		this._renderShoot();
	}

	/**
	 * getPositionX
	 */
	public get getPositionX(): number {
		return this._positionX;
	}
	/**
	 * getPositionY
	 */
	public get getPositionY(): number {
		return this._positionY;
	}

	/**
	 * shootRender
	 */
	private _renderShoot() {
		this._context.fillStyle = "red";
		this._context.fillRect(
			this._positionX - this._shootThickness / 2,
			this._positionY - this._shootLength,
			this._shootThickness,
			this._shootLength
		);
	}
	/**
	 * this function clears the current shoot
	 */
	private _clearShoot() {
		this._context.clearRect(
			this._positionX - this._shootThickness / 2,
			this._positionY - this._shootLength,
			this._shootThickness + 0.5,
			this._shootLength + 0.1
		);
	}
}
