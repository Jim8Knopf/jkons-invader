import { Enemy } from "./enemy.js";
export class EnemyHandler {
	private enemies: Enemy[];
	constructor() {
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
		for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].moveEnemy();
		}
	}

	public get getEnemiesY(): number[] {
		const yList: number[] = [];
		for (let i = 0; i < this.enemies.length; i++) {
			yList.push(this.enemies[i].y);
		}
		return yList;
	}
}
