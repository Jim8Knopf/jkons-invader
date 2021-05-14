import { EnemyRow, RowDirection } from "./enemyRow";
import { getContext } from "./gameHelper";
import { addShot, getEnemyRows, getShots } from "./gameObjects";
import { getScaledTileSize, getTileSize } from "./gameSettings";
import { score, stopGame } from "./main";
import { shotPlayer } from "./shotPlayer";
import { url } from "../web";
import { Shot, who } from "./shot";
import { shotEnemy } from "./shotEnemy";
export class Enemy {
	private _context: CanvasRenderingContext2D = getContext();
	private _live: number = 1;
	private _shoots: Array<shotPlayer> = getShots();
	private _handler: EnemyRow;
	private _enemyRow: number;
	private _shot: shotEnemy;

	// TODO maybe a tile service
	private _sheet = new Image();
	private _tileFrameX = 0;
	private _tileFrameY = 2;
	// TODO get tile from tile config
	private _spriteChangeCounter = 0;

	private _x: number;
	private _y: number;
	private _speedX: number = 5;
	private _speedY: number = getScaledTileSize();

	private _canvasCollision: {
		right: number;
		left: number;
		top: number;
		bottom: number;
	};

	constructor(handler: EnemyRow, x: number, y: number, enemyRow: number) {
		this._x = x;
		this._y = y;
		this._handler = handler;
		this._enemyRow = enemyRow;
		this._shot = new shotEnemy(who.enemy);
		addShot(this._shot);

		this._canvasCollision = {
			right: this._context.canvas.width - getScaledTileSize(),
			left: 0,
			top: 0,
			bottom: this._context.canvas.height - getScaledTileSize() * 2,
		};
		// if (url) {
		// 	this._sheet.src = url + "/img/ji-sheet.png";
		// } else {
		this._sheet.src = "/img/ji-sheet.png";
		// }
	}

	private _translate(x: number, y: number) {
		this._context.clearRect(
			this._x,
			this._y,
			getScaledTileSize(),
			getScaledTileSize()
		);
		this._x += x;
		this._y += y;
		this._renderEnemy();
	}
	// Render enemy
	private _renderEnemy(): void {
		this._context.drawImage(
			this._sheet,
			getTileSize() * this._tileFrameX,
			getTileSize() * this._tileFrameY,
			getTileSize(),
			getTileSize(),
			this._x,
			this._y,
			getScaledTileSize(),
			getScaledTileSize()
		);
	}

	public moveEnemy() {
		// check hit function
		this._hit();
		this._spriteAnimation();

		if (this._handler.getRowDirection === RowDirection.right) {
			this._translate(this._speedX, 0);
		} else {
			this._translate(-this._speedX, 0);
		}

		if (this._x >= this._canvasCollision.right) {
			this._handler.setRowDirection = RowDirection.left;
			this._handler.setMoveDown = true;
		} else if (this._x <= this._canvasCollision.left) {
			this._handler.setRowDirection = RowDirection.right;
			this._handler.setMoveDown = true;
		}
		if (this._handler.getMoveDown) {
			this._translate(0, this._speedY);
		}

		this._dead();
		this._shoot();
		this._gameOver();
	}

	/**
	 * moveDown
	 */
	public moveDown() {
		this._translate(0, this._speedY);
	}

	public moveHorizontally() {
		this._translate(this._speedX, 0);
	}
	public changeDirection() {
		this._speedX = -this._speedX;
	}

	private _spriteAnimation() {
		// count's up till a specified number, then reset
		if (this._spriteChangeCounter >= 50) {
			this._spriteChangeCounter = 0;
			// change current frame
			if (this._tileFrameX < 1) this._tileFrameX++;
			else this._tileFrameX = 0;
		} else {
			this._spriteChangeCounter++;
		}
	}

	/**
	 * the enemy shoot function
	 */
	private _shoot() {
		let random = Math.random() * 10000;
		if (random > 8000) {
			this._canIShoot();
		}
	}

	private _canIShoot() {
		let enemyRows = getEnemyRows();
		if (this._enemyRow === 0) {
			this._fireShot();
			return;
		}
		for (let j = this._enemyRow; j > 0; j--) {
			if (enemyRows[j]) {
				let enemies = enemyRows[j].getEnemies;

				for (let k = 5; k < enemies.length; k++) {
					if (enemies[k].enemyY === this.enemyY) {
						this._fireShot();
						return;
					}
					let nextLeft = enemies[k].enemyX;
					let nextRight = nextLeft + getScaledTileSize();
					let left = this._x;
					let right = left + getScaledTileSize();
					if (nextLeft <= left && nextRight >= left) {
						return;
					}
					if (nextLeft <= right && nextRight >= right) {
						return;
					}
					this._fireShot();
					return;
				}
			}
		}
	}

	private _hit() {
		for (let j = 0; j < this._shoots.length; j++) {
			let shootX = this._shoots[j].getX;
			let shootY = this._shoots[j].getY;
			if (
				shootY > this._y &&
				shootY <= this._y + getScaledTileSize() &&
				shootX >= this._x &&
				shootX <= this._x + getScaledTileSize()
			) {
				this._shoots[j].hit();
				this._live--;
				score();
			}
		}
	}
	private _dead() {
		if (this._live <= 0) {
			this._handler.removeEnemy(this);
			this._context.clearRect(
				this._x,
				this._y,
				getScaledTileSize(),
				getScaledTileSize()
			);
			// * removed random spawn for classic mode
			// * for the classic mode spawning look in the main
		}
	}

	private _gameOver() {
		if (this._y > this._canvasCollision.bottom) {
			stopGame();
		}
	}
	private _fireShot() {
		this._shot.shoot(
			this._x + getScaledTileSize() / 2,
			this._y + getScaledTileSize() + 20
		);
	}

	public get enemyY(): number {
		return this._y;
	}

	public get enemyX(): number {
		return this._x;
	}
}
