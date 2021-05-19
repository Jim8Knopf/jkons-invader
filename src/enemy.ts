import { EnemyColumn } from "./enemyColumn";
import { getCanvas, getContext } from "./gameHelper";
import { addShot, getShots } from "./gameObjects";
import { getScaledTileSize } from "./gameSettings";
import { stopGame } from "./main";
import { countScore } from "./save";
import { Shot, who } from "./shot";
import { playEnemyDeadSound, playHitSound } from "./soundHandler";

export abstract class Enemy {
	protected abstract _live: number;
	protected _y: number;
	protected _speed: number = 36;
	protected _enemyColumn: EnemyColumn;
	protected _shot: Shot;
	protected _shoots: Array<Shot> = getShots();
	protected _sheet = new Image();

	constructor(enemyColumn: EnemyColumn, y: number) {
		this._enemyColumn = enemyColumn;
		this._y = y;
		this._shot = new Shot(who.enemy);
		addShot(this._shot);
		this._sheet.src = "assets/img/ji-sheet.png";
	}

	public renderEnemy(): void {
		this._renderImg();
		this._shoot();
	}
	public moveDown(): void {
		if (this._enemyColumn.getCorp.getDown) {
			this._y += this._speed;
			this._gameOver();
		}
	}

	public clear(x: number): void {
		getContext().clearRect(
			x,
			this._y,
			getScaledTileSize(),
			getScaledTileSize()
		);
	}

	public hit(): void {
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
				playHitSound();
				this._dead();
				countScore();
			}
		}
	}
	protected _dead(): void {
		if (this._live <= 0) {
			this._enemyColumn.removeEnemy(this);
			playEnemyDeadSound();
			// * removed random spawn for classic mode
			// * for the classic mode spawning look in the main
		}
	}

	/**
	 * render the dummy square for simplicity
	 */
	protected _renderDummy(): void {
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
	protected abstract _renderImg(): void;

	/**
	 * the game over function checks if an enemy reaches the bottom.
	 * if it reaches the bottom it stops the game.
	 */
	protected _gameOver(): void {
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
	protected _shoot(): void {
		let random = Math.random() * 10000;
		if (random > 9991 && this._enemyColumn.getEnemyIndex(this) === 0) {
			this._fireShot();
		}
	}
	private _fireShot(): void {
		this._shot.shoot(
			this._enemyColumn.getX + getScaledTileSize() / 2,
			this._y + getScaledTileSize() + 20
		);
	}
}
