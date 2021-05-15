import { EnemyColumn } from "./enemyColumn";
import { getContext } from "./gameHelper";

export class Enemy {
	private _x: number;
	private _y: number;
	private _speed: number = 36;
	private _enemyColumn: EnemyColumn;
	constructor(enemyColumn: EnemyColumn, y: number) {
		this._enemyColumn = enemyColumn;
		this._x = enemyColumn.getX;
		this._y = y;
		this.renderEnemy();
	}

	public renderEnemy() {
		getContext().strokeStyle = "white";
		getContext().strokeRect(this._enemyColumn.getX, this._y, 36, 36);
	}
	public moveDown() {
		if (this._enemyColumn.getCorp.getDown) {
			this._y += this._speed;
		}
		this.renderEnemy();
	}
}
