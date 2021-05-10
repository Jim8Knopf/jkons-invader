import { Player } from "./player";

export class Shot {
	private _context: CanvasRenderingContext2D;
	private _shootLength: number = 10;
	private _shootThickness: number = 5;
	private _shootSpeed: number = 5;
	private _x: number = 0;
	private _y: number = 0;

	private _player: Player;

	constructor(context: CanvasRenderingContext2D, player: Player) {
		this._context = context;
		this._player = player;

		/**
		 * shoot if there is no actual shoot an the field
		 */
	}
	public startShot() {
		this._clearShot();
		this._x = this._player.positionX + 31 / 2;
		this._y = this._player.positionY;
	}
	/**
	 * hit should be called when anything is hitten by the shot
	 */
	public hit() {
		this._clearShot();
		this._y = 0;
	}
	/**
	 * this function checks if the shoot is in the field
	 * than it clears the old shoot
	 * than it moves the shoot up and paint it
	 */
	public animateShot() {
		this._renderShot();
		if (this._y >= 0) {
			this._y -= this._shootSpeed;
		}
	}
	/**
	 * shootRender
	 */
	private _renderShot() {
		this._context.fillStyle = "red";
		this._context.fillRect(
			this._x,
			this._y - this._shootLength,
			this._shootThickness,
			this._shootLength
		);
	}
	/**
	 * this function clears the current shoot
	 */
	private _clearShot() {
		this._context.clearRect(
			this._x - this._shootThickness / 2,
			this._y - this._shootLength,
			this._shootThickness + 0.5,
			this._shootLength + 0.1
		);
	}

	/**
	 * getPositionX
	 */
	public get getPositionX(): number {
		return this._x;
	}
	/**
	 * getPositionY
	 */
	public get getPositionY(): number {
		return this._y;
	}
}
