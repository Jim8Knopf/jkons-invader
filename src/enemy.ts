import { EnemyHandler } from "./enemyHandler";
import { score } from "./main";
import { Shot } from "./shot";

export class Enemy {
	private _context: CanvasRenderingContext2D;
	private _live: number = 1;
	private _shoots: Array<Shot>;
	private _handler: EnemyHandler;

	// TODO maybe a tile service
	private _sheet = new Image();
	private _tileFrameX = 0;
	private _tileFrameY = 2;
	// TODO get tile from tile config
	private _tileWidth: number = 9;
	private _tileHeight: number = 9;
	private _spriteChangeCounter = 0;
	private _zoom: number;
	private _zoomedWidth: number;
	private _zoomedHeight: number;

	private _x: number;
	private _y: number;
	private _speedX: number;
	private _speedY: number;

	private _canvasCollision: {
		right: number;
		left: number;
		top: number;
		bottom: number;
	};

	constructor(
		context: CanvasRenderingContext2D,
		shoots: Array<Shot>,
		handler: EnemyHandler,
		zoom: number,
		x: number,
		y: number
	) {
		this._x = x;
		this._y = y;
		this._speedX = 5;
		this._speedY = 35;
		this._zoom = zoom;
		this._zoomedWidth = this._tileWidth * this._zoom;
		this._zoomedHeight = this._tileHeight * this._zoom;
		this._shoots = shoots;
		this._handler = handler;
		this._context = context;

		this._canvasCollision = {
			right: this._context.canvas.width - this._zoomedWidth,
			left: 0,
			top: 0,
			bottom: this._context.canvas.width - this._zoomedHeight * 9,
		};
		this._sheet.src = "../img/ji-sheet.png";
	}

	private _translate(x: number, y: number) {
		this._context.clearRect(
			this._x,
			this._y,
			this._zoomedWidth,
			this._zoomedHeight
		);
		this._x += x;
		this._y += y;
		this._renderEnemy();
	}
	// Render enemy
	private _renderEnemy(): void {
		this._context.drawImage(
			this._sheet,
			this._tileWidth * this._tileFrameX,
			this._tileWidth * this._tileFrameY,
			this._tileWidth,
			this._tileWidth,
			this._x,
			this._y,
			this._zoomedWidth,
			this._zoomedHeight
		);
	}

	public moveEnemy() {
		// check hit function
		this._hit();
		this._spriteAnimation();
		if (
			(this._speedX > 0 && this._x <= this._canvasCollision.right) ||
			(this._speedX < 0 && this._x >= this._canvasCollision.left)
		) {
			this._translate(this._speedX, 0);
		}
		if (
			(this._speedX > 0 && this._x >= this._canvasCollision.right) ||
			(this._speedX < 0 && this._x <= this._canvasCollision.left)
		) {
			this._speedX = -this._speedX;
			this._translate(0, this._speedY);
		}
		this._dead();
		this._gameOver();
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

	private _hit() {
		for (let j = 0; j < this._shoots.length; j++) {
			let shootX = this._shoots[j].getX;
			let shootY = this._shoots[j].getY;
			if (
				shootY > this._y &&
				shootY <= this._y + this._zoomedHeight &&
				shootX >= this._x &&
				shootX <= this._x + this._zoomedWidth
			) {
				console.log("HIT");
				this._shoots[j].hit();
				this._live--;
				score();
			}
			this._shoots[j].getX;
		}
	}
	private _dead() {
		if (this._live <= 0) {
			this._handler.removeEnemy(this);
			this._context.clearRect(
				this._x,
				this._y,
				this._zoomedWidth,
				this._zoomedHeight
			);
			const randomX =
				Math.floor(Math.random() * (this._context.canvas.width / 9)) * 9;
			let randomY = Math.floor(
				Math.random() * (this._canvasCollision.bottom / 9) * 9
			);
			while (
				this._handler.getEnemiesY.find((y) => {
					randomY >= y && randomY <= randomY + this._zoomedHeight;
				})
			) {
				randomY =
					Math.floor(Math.random() * (this._context.canvas.height / 9)) * 9;
			}

			setTimeout(() => {
				this._handler.addEnemy(
					new Enemy(
						this._context,
						this._shoots,
						this._handler,
						this._zoom,
						randomX,
						randomY
					)
				);
			}, 10000);
		}
	}

	private _gameOver() {
		if (this._y > this._canvasCollision.bottom) {
			console.log("finish");
		}
	}

	public get zoom(): number {
		return this._zoom;
	}

	public get tileWidth(): number {
		return this._tileWidth;
	}

	public get tileHeight(): number {
		return this._tileHeight;
	}

	public get y(): number {
		return this._y;
	}
}
