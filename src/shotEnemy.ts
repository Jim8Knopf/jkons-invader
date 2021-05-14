import { Shot } from "./shot";

export class shotEnemy extends Shot {
	/**
	 * get y position of the shot
	 */
	public get getY(): number {
		return this._y + this._length;
	}
}
