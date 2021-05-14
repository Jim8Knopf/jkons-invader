import { Enemy } from "./enemy";
import { getContext } from "./gameHelper";
import { Shot } from "./shot";
export enum RowDirection {
	right,
	left,
}
export class EnemyRow {
	private _enemies: Enemy[] = [];
	private _shots: Shot[];
	private _x: number = 0;
	private _y: number = 0;
	private _rowLength: number = 0;
	private direction: RowDirection = RowDirection.right;
	private moveDown: boolean = false;

	// TODO check if row longer as canvas width and if no other enemy row is in this row
	constructor(
		shots: Shot[],
		length: number,
		rowX?: number,
		rowY?: number,
		spaceX?: number,
		spaceY?: number
	) {
		this._shots = shots;
		let spaceXBetween = 36;
		let spaceYBetween = 36;

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

		if (length * 36 + spaceX * length + rowX <= getContext().canvas.width) {
			const enemies: Enemy[] = [];
			this._x = rowX;
			this._y = rowY;

			let enemyX = rowX;
			for (let i = 0; i < length; i++) {
				enemies.push(
					new Enemy(getContext(), this._shots, this, 4, enemyX, rowY)
				);
				enemyX += spaceXBetween;
				// enemyY += spaceYBetween;
			}
			this._enemies = enemies;
			this.updateRowLength();
		} else {
			throw new Error(
				"Could not update row, because row is longer than canvas."
			);
		}
	}

	// addEnemyToRow() {
	// 	this._enemies.push(
	// 		new Enemy(getContext(), this._shots, this, 4, this._x, this._y)
	// 	);
	// 	this.updateRowLength();
	// }

	// addEnemiesToRow(number: number) {
	// 	for (let i = 0; i < number; i++) {
	// 		this._enemies.push(
	// 			new Enemy(getContext(), this._shots, this, 36, this._x, this._y)
	// 		);
	// 	}
	// 	this.updateRowLength();
	// }

	createEnemyRow(
		length: number,
		rowX?: number,
		rowY?: number,
		addSpace?: number
	) {
		if (length * 36 <= getContext().canvas.width) {
			let spaceBetween = 36;

			if (!rowX || rowX < 0) {
				rowX = 0;
			}
			if (!rowY || rowY < 0) {
				rowY = 0;
			}
			if (addSpace) {
				spaceBetween += addSpace;
			}
			const enemies: Enemy[] = [];
			this._x = rowX;
			this._y = rowY;

			let enemyX = rowX;
			for (let i = 0; i < length; i++) {
				enemies.push(
					new Enemy(getContext(), this._shots, this, 4, enemyX, rowY)
				);
				enemyX += spaceBetween;
			}
			this._enemies = enemies;
			this.updateRowLength();
		} else {
			throw new Error(
				"Could not update row, because row is longer than canvas."
			);
		}
	}

	removeEnemy(enemy: Enemy) {
		this._enemies.splice(this._enemies.indexOf(enemy), 1);
		this.updateRowLength();
	}

	updateRowLength() {
		this._rowLength = this._enemies.length;
	}

	moveEnemyRow() {
		for (let i = 0; i < this._enemies.length; i++) {
			if (this._enemies.length - 1 === i) {
				if (this.getRowDirection === RowDirection.right && this.getMoveDown) {
					this._enemies[i].moveEnemy();
				}
				this.setMoveDown = false;
			}

			this._enemies[i].moveEnemy();
		}

		// if (this._x === 0) {
		// 	this.createEnemyRow()
		// }
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

	public get getEnemiesY(): number[] {
		const yList: number[] = [];
		for (let i = 0; i < this._enemies.length; i++) {
			yList.push(this._enemies[i].getY);
		}
		return yList;
	}

	// // ! debugging function
	// public get getArray
}
