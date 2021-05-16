import { EnemyColumn } from "./enemyColumn";
import { getCanvas, getContext } from "./gameHelper";
import { addShot, getShots } from "./gameObjects";
import { getScaledTileSize } from "./gameSettings";
import { score, stopGame } from "./main";
import { Shot, who } from "./shot";
import { shotEnemy } from "./shotEnemy";

export abstract class Enemy {
	protected _y: number;
	protected _live: number = 1;
	protected _speed: number = 36;
	protected _enemyColumn: EnemyColumn;
	protected _shot: Shot;
	protected _shoots: Array<Shot> = getShots();
	protected _dummy: boolean = false;

	constructor(enemyColumn: EnemyColumn, y: number) {
		this._enemyColumn = enemyColumn;
		this._y = y;
		this._shot = new shotEnemy(who.enemy);
		addShot(this._shot);
	}

	public renderEnemy() {
		this._renderDummy();
		this._shoot();
	}
	public moveDown() {
		if (this._enemyColumn.getCorp.getDown) {
			this._y += this._speed;
			// this.renderEnemy();
			this._gameOver();
		}
	}

	public clear(x: number) {
		getContext().clearRect(
			x,
			this._y,
			getScaledTileSize(),
			getScaledTileSize()
		);
		// this._renderEnemy();
	}
	/**
	 * dummy
	 */
	public dummy(): boolean {
		return this._dummy;
	}

	public hit() {
		for (let j = 0; j < this._shoots.length; j++) {
			let shootX = this._shoots[j].getX;
			let shootY = this._shoots[j].getY;
			if (
				shootY > this._y &&
				shootY <= this._y + getScaledTileSize() &&
				shootX >= this._enemyColumn.getX &&
				shootX <= this._enemyColumn.getX + getScaledTileSize()
			) {
				this._shoots[j].hit();
				this._live--;
				this._dead();
				score();
			}
		}
	}
	protected _dead() {
		if (this._live <= 0) {
			this._enemyColumn.removeEnemy(this);
			// * removed random spawn for classic mode
			// * for the classic mode spawning look in the main
		}
	}

	/**
	 * render the dummy square for simplicity
	 */
	protected _renderDummy() {
		let borderThickness: number = 1;
		getContext().fillStyle = "white";
		getContext().fillRect(
			this._enemyColumn.getX,
			this._y,
			getScaledTileSize(),
			getScaledTileSize()
		);
		getContext().clearRect(
			this._enemyColumn.getX + borderThickness,
			this._y + borderThickness,
			getScaledTileSize() - borderThickness * 2,
			getScaledTileSize() - borderThickness * 2
		);
	}
	protected _gameOver() {
		if (
			this._y + getScaledTileSize() >
			getContext().canvas.height - getScaledTileSize()
		) {
			stopGame();
		}
	}
	/**
	 * the enemy shoot function
	 */
	protected _shoot() {
		let random = Math.random() * 10000;
		if (random > 9991 && this._enemyColumn.getEnemyIndex(this) === 0) {
			// this._canIShoot();
			console.log("peng");
			this._fireShot();
		}
	}
	private _fireShot() {
		this._shot.shoot(
			this._enemyColumn.getX + getScaledTileSize() / 2,
			this._y + getScaledTileSize() + 20
		);
	}
}
