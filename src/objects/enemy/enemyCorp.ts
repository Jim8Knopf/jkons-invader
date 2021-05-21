import { EnemyColumn } from "./enemyColumn";
import { getCanvas, getContext } from "../../helper/gameHelper";
import {
	getEnemyGap,
	getNewEnemys,
	getScaledTileSize,
	getTileSize,
} from "../../helper/gameSettings";
import { getScore } from "../../helper/save";
import { stopGame } from "../../helper/gameStates";

export class EnemyCorp {
	private _enemyCorp: Array<EnemyColumn> = new Array();
	private _right: boolean = true;
	private _down: boolean = false;
	private _newLine: number = getNewEnemys();
	constructor(columns: number, rows: number) {
		for (let i = 0; i < columns; i++) {
			this._enemyCorp.push(
				new EnemyColumn(this, rows, i * (getScaledTileSize() + getEnemyGap()))
			);
		}
	}

	public updateEnemyCorp(): void {
		this._renderCorp();
		if (this._enemyCorp.length === 0) {
			stopGame();
		}
		/**
		 * adds the new row
		 */
		if (getScore() >= this._newLine) {
			this._newLine += getNewEnemys();
			this._enemyCorp.forEach((column) => {
				column.addEnemy();
			});
		}
	}

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
