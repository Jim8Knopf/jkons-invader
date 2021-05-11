export class Shot {
	// canvas context for drawing shapes
	private _context: CanvasRenderingContext2D;

	// shot coordinates and velocity
	private _x: number;
	private _y: number;
	private _velocity: number = 20;

	// defines the shot length and thickness for the drawing of shot
	private _length: number = 10;
	private _thickness: number = 5;

	constructor(context: CanvasRenderingContext2D) {
		this._context = context;
		this._x = 0;
		this._y = 0;
	}

	/**
	 * shoot if there is no actual shoot an the field
	 */
	public shoot(positionX: number, positionY: number) {
		if (this._y <= 0) {
			this._clear();
			this._x = positionX;
			this._y = positionY;
		}
	}
	/**
	 * hit should be called when anything is hitten by the shot
	 */
	public hit() {
		this._clear();
		this._y = 0;
	}

	/**
	 * checks if the shoot is in the field
	 * than it clears the old shoot
	 * than it moves the shoot up and paint it
	 */
	public shootAnimation() {
		if (this._y <= 0) {
			this._clear();
		}

		this._clear();
		this._y -= this._velocity;
		this._render();
	}

	/**
	 * clears the current shoot
	 */
	private _clear() {
		this._context.clearRect(
			this._x - this._thickness / 2,
			this._y - this._length,
			this._thickness + 0.5,
			this._length + 0.1
		);
	}

	/**
	 * draws the shot on screen
	 */
	private _render() {
		this._context.fillStyle = "red";
		this._context.fillRect(
			this._x - this._thickness / 2,
			this._y - this._length,
			this._thickness,
			this._length
		);
	}

	/**
	 * get x position of the shot
	 */
	public get getX(): number {
		return this._x;
	}
	/**
	 * get y position of the shot
	 */
	public get getY(): number {
		return this._y;
	}
}
