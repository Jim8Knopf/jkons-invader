import { fromEvent, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getCanvas, getContext } from "../helper/gameHelper";
import { getScaledTileSize, getTileSize } from "../helper/gameSettings";
import { addShot, getShots } from "../helper/gameObjects";
import { Shot, who } from "./shot";
import { playHitSound } from "../helper/soundHandler";
import { gameState, stopGame } from "../helper/gameStates";

export class Player {
	private _shot: Shot;

	// complete tile sheet
	private _sheet = new Image();

	// control keys for moving left and right and fire a shot
	private _left: string;
	private _right: string;
	private _fire: string;

	// player life
	private _life: number = 3;

	// shots shoot by the player
	protected _shots: Array<Shot> = getShots();

	// player coordinates and velocity
	private _x: number =
		getCanvas().height - (getCanvas().width - getScaledTileSize()) / 2;
	private _y: number = getCanvas().height - getScaledTileSize();
	private _velocity: number = 4;

	// displays player life
	private lifeOutElement = <HTMLOutputElement>document.getElementById("live");

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

		// new shot
		this._shot = new Shot(who.player);
		addShot(this._shot);

		// draw player on page load
		this._render(true);

		this.lifeOutElement.value = this._life.toString();
	}

	public handleInput() {
		// execute events of player on input
		if (this.pressed_keys.includes(this._left)) this._moveLeft();
		if (this.pressed_keys.includes(this._right)) this._moveRight();
		if (this.pressed_keys.includes(this._fire)) this._fireShot();

		// update player
		this._clear();
		this._render(true);
		this._hit();
	}

	// moves left but not out of the screen
	private _moveLeft() {
		this._x = this._x - this._velocity > 0 ? this._x - this._velocity : 0;
	}

	// moves right but not out of the screen
	private _moveRight() {
		this._x =
			this._x + getScaledTileSize() < getCanvas().width
				? this._x + this._velocity
				: getCanvas().width - getScaledTileSize();
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
		this._sheet.src = "assets/img/ji-sheet.png";
		if (onload) {
			const that = this;
			this._sheet.onload = function () {
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
	public _hit(): void {
		for (let j = 0; j < this._shots.length; j++) {
			let shootX = this._shots[j].getX;
			let shootY = this._shots[j].getY;
			if (
				shootY > this._y &&
				shootY <= this._y + getScaledTileSize() &&
				shootX >= this._x &&
				shootX <= this._x + getScaledTileSize()
			) {
				this._shots[j].hit();
				this._life--;
				this.lifeOutElement.value = this._life.toString();
				playHitSound();
				this._dead();
				console.log(this._life);
			}
		}
	}
	private _dead(): void {
		if (this._life <= 0) {
			stopGame();
		}
	}
	/**
	 * Add life.
	 */
	public addLife() {
		this._life++;
		this.lifeOutElement.value = this._life.toString();
	}

	/**
	 * Reset life.
	 */
	public resetLife() {
		this._life = 3;
		this.lifeOutElement.value = this._life.toString();
	}

	/**
	 * Activate and handle gamepad input.
	 */
	public handleGamepadInput() {
		// Configured for Xbox One Controller
		const gp = (navigator.getGamepads ? navigator.getGamepads() : [])[0];

		// Exit when no controller is connected
		if (!gp) {
			return;
		}

		/**
		 * Move right when left stick is left,
		 * right stick is left or
		 * left is pressed on control pad
		 * added tolerance of 0.25 for sticks
		 */
		if (gp.axes[0] < -0.25 || gp.axes[2] < -0.25 || gp.buttons[14].pressed) {
			this._moveLeft();
			/**
			 * Move right when left stick is right,
			 * right stick is right or
			 * right is pressed on control pad
			 * added tolerance of -0.25 for sticks
			 */
		} else if (
			gp.axes[0] > 0.25 ||
			gp.axes[2] > 0.25 ||
			gp.buttons[15].pressed
		) {
			this._moveRight();
		}

		// Fire when right trigger, left trigger or "A" button is pressed.
		if (
			// right trigger
			gp.buttons[7].pressed ||
			// left trigger
			gp.buttons[6].pressed ||
			// "A" button
			gp.buttons[0].pressed
		) {
			this._fireShot();
		}
	}
}
