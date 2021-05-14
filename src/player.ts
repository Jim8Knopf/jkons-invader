import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getCanvas, getContext } from "./gameHelper";
import { getShot } from "./gameObjects";
import { getScaledTileSize, getTileSize } from "./gameSettings";
import { Shot } from "./shot";

export class Player {
	private _shot: Shot = getShot();

	// complete tile sheet
	private _sheet = new Image();

	// control keys for moving left and right and fire a shot
	private _left: string;
	private _right: string;
	private _fire: string;

	// player coordinates and velocity
	private _x: number =
		getCanvas().height - (getCanvas().width - getScaledTileSize()) / 2;
	private _y: number = getCanvas().height - getScaledTileSize();
	private _velocity: number = 4;

	// save a list of pressed keys to allow multiple pressed keys at the same time
	private pressed_keys: string[] = [];

	// recognize when a key is down on the keyboard
	private _keydown = fromEvent<KeyboardEvent>(document, "keydown");
	private _keydown$: Observable<void> = this._keydown.pipe(
		map((event: KeyboardEvent) => {
			// add key to pressed keys when pressed
			this.pressed_keys.push(event.key);
		})
	);

	// recognize when a key is up after a key was down on the keyboard
	private _keyup = fromEvent<KeyboardEvent>(document, "keyup");
	private _keyup$: Observable<void> = this._keyup.pipe(
		map((event: KeyboardEvent) => {
			// remove key from pressed keys when not pressed anymore
			this.pressed_keys = this.pressed_keys.filter((k) => k !== event.key);
		})
	);

	keydownSubscription = this._keydown$.subscribe();
	keyupSubscription = this._keyup$.subscribe();

	constructor(left: string, right: string, fire: string) {
		// assign player controls
		this._left = left;
		this._right = right;
		this._fire = fire;
		// draw player on page load
		this._render(true);
	}

	public handleInput() {
		// execute events of player on input
		if (this.pressed_keys.includes(this._left)) this._moveLeft();
		if (this.pressed_keys.includes(this._right)) this._moveRight();
		if (this.pressed_keys.includes(this._fire)) this._fireShot();

		// update player
		this._clear();
		this._render(true);
	}

	// moves left but not out of the screen
	private _moveLeft() {
		this._x = this._x - this._velocity >= 0 ? this._x - this._velocity : 0;
	}

	// moves right but not out of the screen
	private _moveRight() {
		this._x =
			this._x + getScaledTileSize() <= getCanvas().width
				? this._x + this._velocity
				: this._x;
	}

	private _fireShot() {
		this._shot.shoot(this._x + getScaledTileSize() / 2, this._y);
	}

	// clear player on screen
	private _clear() {
		getContext().clearRect(
			this._x - this._velocity,
			this._y,
			getCanvas().width,
			getCanvas().height
		);
	}

	// draw player on screen
	private _render(onload?: boolean) {
		if (onload) {
			const that = this;
			this._sheet.onload = function () {
				that._sheet.src = "assets/img/ji-sheet.png";
				getContext().drawImage(
					that._sheet,
					0,
					0,
					getTileSize(),
					getTileSize(),
					that._x,
					that._y,
					getScaledTileSize(),
					getScaledTileSize()
				);
			};
		} else {
			getContext().drawImage(
				this._sheet,
				0,
				0,
				getTileSize(),
				getTileSize(),
				this._x,
				this._y,
				getScaledTileSize(),
				getScaledTileSize()
			);
		}
	}
}
