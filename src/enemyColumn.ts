import { getContext } from "./gameHelper";
import { EnemyCorp } from "./enemyCorp";
import { Enemy } from "./enemy";
import { getScaledTileSize } from "./gameSettings";
import { EnemyL1 } from "./enemyL1";
import { enemyDummy } from "./enemyDummy";

export class EnemyColumn {
	private _x: number;
	private _speed: number = 4;
	private _enemyCorp: EnemyCorp;
	private _enemyColumn: Array<Enemy> = new Array();
	constructor(enemyCorp: EnemyCorp, rows: number, x: number) {
		this._enemyCorp = enemyCorp;
		this._x = x;
		rows = Math.abs(rows);
		for (let i = rows; i > 0; i--) {
			this._enemyColumn.push(new EnemyL1(this, i * 42));
		}
	}

	public move() {
		if (this._enemyCorp.getRight) {
			this._speed = Math.abs(this._speed);
		} else {
			this._speed = Math.abs(this._speed) * -1;
		}
		this._x += this._speed;
		for (let i = 0; i < this._enemyColumn.length; i++) {
			this._enemyColumn[i]?.clear(this._x - this._speed);
			this._enemyColumn[i]?.hit();
			this._enemyColumn[i]?.moveDown?.();
			this._enemyColumn[i]?.renderEnemy();
		}
	}
	public get getCorp(): EnemyCorp {
		return this._enemyCorp;
	}

	public get getX(): number {
		return this._x;
	}

	public removeEnemy(enemy: Enemy) {
		const index = this._enemyColumn.indexOf(enemy);
		if (index > -1) {
			this._enemyColumn.splice(index, 1);
		}
	}

	public getEnemyIndex(enemy: Enemy): number {
		return this._enemyColumn.indexOf(enemy);
	}
}
