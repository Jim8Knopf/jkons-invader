import { combineLatest, fromEvent, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { isThisTypeNode } from "typescript";
import { Shot } from "./shot";

export class Player {
	private _context: CanvasRenderingContext2D;
	
	private _zoomedSize: number;
	private _tileSize: number = 9;
	private _playerSpeed: number = 5;
	private _sheet = new Image();
	public _x: number;
	public _y: number;
	private _left: string;
	private _right: string;
	private _fire: string;
	private pressed_keys: string[] = [];
	private shot: Shot;

	// keydown event
	private _keydown = fromEvent<KeyboardEvent>(document, "keydown");
	private _keydown$: Observable<void> = this._keydown.pipe(
		map((event: KeyboardEvent) => {
			// add key to pressed keys when pressed
			this.pressed_keys.push(event.key);
		})
	);

	private _keySpace = fromEvent<KeyboardEvent>(document, "keyup");
	private _keySpace$: Observable<void> = this._keySpace.pipe(
		map((event: KeyboardEvent) => {
			// remove key from pressed keys when not pressed anymore
			this.pressed_keys = this.pressed_keys.filter((k) => k !== event.key);
		})
	);

	subscribe = this._keydown$.subscribe();
	subscribe2 = this._keySpace$.subscribe();

	constructor(
		context: CanvasRenderingContext2D,
		shot: Shot,
		zoom: number,
		left: string,
		right: string,
		fire: string
	) {
		const that = this;
		this._zoomedSize = zoom * this._tileSize;
		this._context = context;
		this.shot = shot;
		this._left = left;
		this._right = right;
		this._fire = fire;
		this._y = context.canvas.height - this._zoomedSize;
		this._x = (context.canvas.width - this._zoomedSize) / 2;
		this._sheet.src = "../img/ji-sheet.png";
		this._sheet.onload = function () {
			context.drawImage(
				that._sheet,
				0,
				0,
				9,
				9,
				that._x,
				that._y,
				that._zoomedSize,
				that._zoomedSize
			);
		};
	}
	/**
	 * it checks the KeyboardEvent and activate the shoot ore moves
	 * @param event is the KeyboardEvent
	 */
	public move() {
		if (this.pressed_keys.includes(this._left))
			// moves left but not out of the screen
			this._x =
				this._x - this._playerSpeed >= 0 ? this._x - this._playerSpeed : 0;
		if (this.pressed_keys.includes(this._right))
			// moves right but not out of the screen
			this._x =
				this._x + this._zoomedSize <= this._context.canvas.width
					? this._x + this._playerSpeed
					: this._x;
		if (this.pressed_keys.includes(this._fire)) {
			// activates the shoot if possible
			this.shot.shoot(this._x + this._zoomedSize / 2, this._y);
		}
		this._context.clearRect(
			this._x - this._playerSpeed,
			this._y,
			this._context.canvas.width,
			this._context.canvas.height
		);
		this._context.drawImage(
			this._sheet,
			0,
			0,
			9,
			9,
			this._x,
			this._y,
			this._zoomedSize,
			this._zoomedSize
		);
	}
}
