import { Enemy } from "./enemy";
export enum RowDirection {
	right,
	left,
}
export class EnemyHandler {
	private _context: CanvasRenderingContext2D;
	private enemies: Enemy[];
	private direction: RowDirection = RowDirection.right;
	private moveDown: number = 0;

	constructor(context: CanvasRenderingContext2D) {
		this._context = context;
		this.enemies = [];
	}

	addEnemy(enemy: Enemy) {
		this.enemies.push(enemy);
	}

	addEnemies(enemies: Enemy[]) {
		this.enemies.concat(enemies);
	}

	removeEnemy(enemy: Enemy) {
		this.enemies.splice(this.enemies.indexOf(enemy), 1);
	}

	moveEnemies() {
		// if (this.getMoveDown) {
		// 	this.setMoveDown = false;
		// }
		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].moveEnemy();

			if (this.enemies.length - 1 === i) {
				this.setMoveDown = 0;
			}
		}
	}

	public get getRowDirection(): RowDirection {
		return this.direction;
	}

	public set setRowDirection(rowDirection: RowDirection) {
		this.direction = rowDirection;
	}

	public get getMoveDown(): number {
		return this.moveDown;
	}

	public set setMoveDown(moveDown: number) {
		this.moveDown = moveDown;
	}

	public get getEnemiesY(): number[] {
		const yList: number[] = [];
		for (let i = 0; i < this.enemies.length; i++) {
			yList.push(this.enemies[i].getY);
		}
		return yList;
	}
}
