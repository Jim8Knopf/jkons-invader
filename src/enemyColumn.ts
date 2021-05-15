import { getContext } from "./gameHelper";
import { EnemyCorp } from "./enemyCorp";
import { Enemy } from "./enemy";
import { getScaledTileSize } from "./gameSettings";

export class EnemyColumn {
	private _x: number;
	private _speed: number = 3;
	private _enemyCorp: EnemyCorp;
	private _enemyColumn: Array<Enemy> = new Array();
	constructor(enemyCorp: EnemyCorp, x: number) {
		this._enemyCorp = enemyCorp;
		this._x = x;
		for (let i = 3; i > 0; i--) {
			this._enemyColumn.push(new Enemy(this, i * 42));
		}
	}

	public move() {
		if (this._enemyCorp.getRight) {
			this._x += this._speed;
		} else {
			this._x -= this._speed;
		}
		for (let i = 0; i < this._enemyColumn.length; i++) {
			this._enemyColumn[i].moveDown();
		}
	}
	public get getCorp(): EnemyCorp {
		return this._enemyCorp;
	}

	public get getX(): number {
		return this._x;
	}
}
