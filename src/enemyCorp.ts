import { Enemy } from "./enemy";
import { EnemyColumn } from "./enemyColumn";
import { getCanvas, getContext } from "./gameHelper";
import { getScaledTileSize, getTileSize } from "./gameSettings";

export class EnemyCorp {
	private _enemyCorp: Array<EnemyColumn> = new Array();
	private _x: number = 0;
	private _y: number = 0;
	private _right: boolean = true;
	private _down: boolean = false;
	constructor(columns: number, rows: number) {
		for (let i = 0; i < columns; i++) {
			this._enemyCorp.push(
				new EnemyColumn(this, rows, getScaledTileSize() + i * 42)
			);
		}
	}

	// public getEnemyCorp(): EnemyColumn[] {
	// 	return this._enemyCorp;
	// }

	public corpAnimation(): void {
		// this._clearCorp();
		this._renderCorp();
	}

	// // ! TODO into enemy level
	// private _clearCorp() {
	// 	getContext().clearRect(
	// 		this._x,
	// 		this._y,
	// 		getCanvas().width,
	// 		getCanvas().height
	// 	);
	// }
	// Render enemy
	private _renderCorp(): void {
		let localRight: boolean = false;
		let localDown: boolean = false;
		// corp array
		for (let i = 0; i < this._enemyCorp.length; i++) {
			// colum array
			this._enemyCorp[i].move();
			if (this._enemyCorp[i].getX + getScaledTileSize() >= getCanvas().width) {
				this._right = false;
				localDown = true;
			}
			if (this._enemyCorp[i].getX <= 0) {
				localRight = true;
				localDown = true;
			}
			// this._down = false;
		}
		if (localRight) {
			this._right = true;
		}
		if (this._down) this._down = false;
		this._down = localDown;
	}

	public get getRight(): boolean {
		return this._right;
	}

	public get getDown(): boolean {
		return this._down;
	}
}
