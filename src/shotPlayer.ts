import { Shot } from "./shot";

export class shotPlayer extends Shot {
	/**
	 * get y position of the shot
	 */
	public get getY(): number {
		return this._y;
	}
}
