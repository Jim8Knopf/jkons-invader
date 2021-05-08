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
    this.enemies.splice(1, this.enemies.indexOf(enemy));
  }

  moveEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].enemyMovement();
    }
  }
}