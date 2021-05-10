import { combineLatest, fromEvent, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { isThisTypeNode } from "typescript";
import { shoot } from "./shoot";

export class Player {
	private _zoomedSize: number;
	private _tileSize: number = 9;
	private _playerSpeed: number = 5;
	private _context: CanvasRenderingContext2D;
	private _baseImage = new Image();
	public shoot: shoot;
	private _left: string;
	private _right: string;
	private _fire: string;
	public positionX: number;
	public positionY: number;
	private pressed_keys: string[] = [];
	private _keydown = fromEvent<KeyboardEvent>(document, "keydown");
	private _keydown$: Observable<void> = this._keydown.pipe(
		map((event: KeyboardEvent) => {
			this.pressed_keys.push(event.key);
		})
	);

	private _keySpace = fromEvent<KeyboardEvent>(document, "keyup");
	private _keySpace$: Observable<void> = this._keySpace.pipe(
		map((event: KeyboardEvent) => {
			this.pressed_keys = this.pressed_keys.filter((k) => k !== event.key);
		})
	);
	//output (example): 'Event time: 7276.390000000001'
	subscribe = this._keydown$.subscribe();
	subscribe2 = this._keySpace$.subscribe();

	constructor(
		context: CanvasRenderingContext2D,
		shoot: shoot,
		zoom: number,
		left: string,
		right: string,
		fire: string
	) {
		const that = this;
		this._zoomedSize = zoom * this._tileSize;
		this._context = context;
		this.shoot = shoot;
		this._left = left;
		this._right = right;
		this._fire = fire;
		this.positionY = context.canvas.height - this._zoomedSize;
		this.positionX = (context.canvas.width - this._zoomedSize) / 2;
		this._baseImage.src = "../img/ji-sheet.png";
		this._baseImage.onload = function () {
			context.drawImage(
				that._baseImage,
				0,
				0,
				9,
				9,
				that.positionX,
				that.positionY,
				that._zoomedSize,
				that._zoomedSize
			);
		};
		// ! add keypress listener
		document.addEventListener("keydown", (event) => {
			that.move();
		});
	}
	/**
	 * it checks the KeyboardEvent and activate the shoot ore moves
	 * @param event is the KeyboardEvent
	 */
	public move() {
		if (this.pressed_keys.includes(this._left)) this.moveLeft();
		if (this.pressed_keys.includes(this._right)) this.moveRight();
		if (this.pressed_keys.includes(this._fire))
			this.shoot.shoot(this.positionX + this._zoomedSize / 2, this.positionY);

		this._context.clearRect(
			this.positionX - this._playerSpeed,
			this.positionY,
			this._context.canvas.width,
			this._context.canvas.height
		);
		this._context.drawImage(
			this._baseImage,
			0,
			0,
			9,
			9,
			this.positionX,
			this.positionY,
			this._zoomedSize,
			this._zoomedSize
		);
	}

	private moveLeft() {
		// moves left but not out of the screen
		this.positionX =
			this.positionX - this._playerSpeed >= 0
				? this.positionX - this._playerSpeed
				: 0;
	}
	private moveRight() {
		// moves right but not out of the screen
		this.positionX =
			this.positionX + this._zoomedSize <= this._context.canvas.width
				? this.positionX + this._playerSpeed
				: this.positionX;
	}
	private playerShoot() {
		// activates the shoot if possible
		this.shoot.shoot(this.positionX + this._zoomedSize / 2, this.positionY);
	}
}
