export class EnemyHandler {
    constructor() {
        this.enemies = [];
    }
    addEnemy(enemy) {
        this.enemies.push(enemy);
    }
    addEnemies(enemies) {
        this.enemies.concat(enemies);
    }
    removeEnemy(enemy) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
    }
    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].moveEnemy();
        }
    }
    get getEnemiesY() {
        const yList = [];
        for (let i = 0; i < this.enemies.length; i++) {
            yList.push(this.enemies[i].y);
        }
        return yList;
    }
}
//# sourceMappingURL=enemyHandler.js.map