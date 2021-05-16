import { getContext } from "./gameHelper";
import { playShotSound } from "./soundHandler";
export enum who {
	player = "player",
	enemy = "enemy",
}
export abstract class Shot {
	// canvas context for drawing shapes
	protected _context: CanvasRenderingContext2D = getContext();

	// shot coordinates and velocity
	protected _x: number = 0;
	protected _y: number = 0;
	protected _w: who;
	protected _velocity: number = 20;
	// defines the shot length and thickness for the drawing of shot
	protected _length: number = 10;
	protected _thickness: number = 5;
	constructor(w: who) {
		this._w = w;
		if (w === who.enemy) {
			this._x = this._context.canvas.width;
			this._y = this._context.canvas.height;
		}
	}

	/**
	 * shoot if there is no actual shoot an the field
	 */
	public shoot(positionX: number, positionY: number) {
		if (this._y <= 0 || this._y > this._context.canvas.height) {
			playShotSound();
			this._clear();
			this._x = positionX;
			this._y = positionY;
		}
	}
	/**
	 * clears the current shoot
	 */
	protected _clear() {
		this._context.clearRect(
			this._x - this._thickness / 2,
			this._y - this._length,
			this._thickness + 0.5,
			this._length + 0.1
		);
	}

	/**
	 * checks if the shoot is in the field
	 * than it clears the old shoot
	 * than it moves the shoot up and paint it
	 */
	public shootAnimation() {
		if (this._y <= 0 || this._y > this._context.canvas.height) {
			this._clear();
		}

		this._clear();
		if (this._w === who.enemy) {
			this._y += this._velocity + this._length;
		}
		if (this._w === who.player) {
			this._y -= this._velocity;
		}
		this._render();
	}

	/**
	 * hit should be called when anything is hit by the shot
	 */
	public hit() {
		this._clear();
		this._y = this._w === who.player ? 0 : this._context.canvas.height + 1;
	}

	/**
	 * draws the shot on screen
	 */
	protected _render() {
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
	abstract get getY(): number;
}
