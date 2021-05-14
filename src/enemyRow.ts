import { Enemy } from "./enemy";
import { getCanvas, getContext } from "./gameHelper";
import { getScaledTileSize } from "./gameSettings";
import { shotPlayer } from "./shotPlayer";
export enum RowDirection {
	right,
	left,
}
export class EnemyRow {
	private _enemies: Enemy[] = [];
	private _x: number = 0;
	private _y: number = 0;
	private _rowLength: number = 0;
	private direction: RowDirection = RowDirection.right;
	private moveDown: boolean = false;

	constructor(length: number, rowX?: number, rowY?: number, spaceX?: number) {
		let spaceXBetween = getScaledTileSize();

		if (!rowX || rowX < 0) {
			rowX = 0;
		}
		if (!rowY || rowY < 0) {
			rowY = 0;
		}
		if (spaceX) {
			spaceXBetween += spaceX;
		}
		if (!spaceX) {
			spaceX = 0;
		}

		if (
			length * getScaledTileSize() + spaceX * length + rowX <=
			getCanvas().width
		) {
			const enemies: Enemy[] = [];
			this._x = rowX;
			this._y = rowY;

			let enemyX = rowX;
			for (let i = 0; i < length; i++) {
				enemies.push(new Enemy(this, enemyX, rowY, i));
				enemyX += spaceXBetween;
				// enemyY += spaceYBetween;
			}
			this._enemies = enemies;
			this._updateRowLength();
		} else {
			throw new Error(
				"Could not update row, because row is longer than canvas."
			);
		}
	}

	private _updateRowLength() {
		this._rowLength = this._enemies.length;
	}

	public removeEnemy(enemy: Enemy) {
		this._enemies.splice(this._enemies.indexOf(enemy), 1);
		this._updateRowLength();
	}

	public moveEnemyRow() {
		for (let i = 0; i < this._enemies.length; i++) {
			if (this._enemies.length - 1 === i) {
				if (this.getRowDirection === RowDirection.right && this.getMoveDown) {
					this._enemies[i].moveEnemy();
				}
				this.setMoveDown = false;
			}

			this._enemies[i].moveEnemy();
		}
	}

	public get getRowDirection(): RowDirection {
		return this.direction;
	}

	public set setRowDirection(rowDirection: RowDirection) {
		this.direction = rowDirection;
	}

	public get getMoveDown(): boolean {
		return this.moveDown;
	}

	public set setMoveDown(moveDown: boolean) {
		this.moveDown = moveDown;
	}

	public get getEnemies(): Array<Enemy> {
		return this._enemies;
	}
}
