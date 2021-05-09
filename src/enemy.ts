import { EnemyHandler } from "./enemyHandler.js";
import { shoot } from "./shoot.js";
import { score } from "./main.js";

export class Enemy {
	private _context: CanvasRenderingContext2D;
	private _live: number = 1;
	private _shoots: Array<shoot>;
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

	private _coordinates: { x: number; y: number } = { x: 0, y: 0 };
	private _speed: { x: number; y: number };
	private _canvasCollision: {
		right: number;
		left: number;
		top: number;
		bottom: number;
	};

	constructor(
		context: CanvasRenderingContext2D,
		shoots: Array<shoot>,
		handler: EnemyHandler,
		zoom: number,
		x?: number,
		y?: number
	) {
		this._zoom = zoom;
		this._zoomedWidth = this._tileWidth * this._zoom;
		this._zoomedHeight = this._tileHeight * this._zoom;
		this._speed = { x: 10, y: this._zoomedHeight };
		this._shoots = shoots;
		this._handler = handler;
		this._context = context;
		if (x) this._coordinates.x = x;
		if (y) this._coordinates.y = y;

		this._canvasCollision = {
			right: this._context.canvas.width - this._zoomedWidth,
			left: 0,
			top: 0,
			bottom: this._context.canvas.width - this._zoomedHeight * 4,
		};
		this._sheet.src = "../img/ji-sheet.png";
	}

	// Render enemy
	public renderEnemy(): void {
		this._context.drawImage(
			this._sheet,
			this._tileWidth * this._tileFrameX,
			this._tileWidth * this._tileFrameY,
			this._tileWidth,
			this._tileWidth,
			this._coordinates.x,
			this._coordinates.y,
			this._zoomedWidth,
			this._zoomedHeight
		);
	}

	public enemyMovement() {
		// check hit function
		this.hit();
		this._dead();
		this._context.clearRect(
			this._coordinates.x - this._speed.x,
			this._coordinates.y,
			this._zoomedWidth,
			this._zoomedHeight
		);
		this.renderEnemy();
		// d
		if (this._coordinates.y <= this._canvasCollision.bottom) {
			// detect if enemy hits left or right border
			if (
				this._coordinates.x > this._canvasCollision.right ||
				this._coordinates.x < this._canvasCollision.left
			) {
				// invert x direction
				this._speed.x = -this._speed.x;
				// put's enemy in the next column
				this._coordinates.y += this._speed.y;
				// clear enemy on row change
				this._context.clearRect(
					this._coordinates.x,
					this._coordinates.y - this._speed.y,
					this._zoomedWidth,
					this._zoomedHeight
				);
			}
		} else {
			this._speed.y = 0;
			this._speed.x = 0;
		}

		// move enemy on x axis
		this._coordinates.x += this._speed.x;

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

	public get zoom(): number {
		return this._zoom;
	}

	public get tileWidth(): number {
		return this._tileWidth;
	}

	public get tileHeight(): number {
		return this._tileHeight;
	}
	private hit() {
		for (let j = 0; j < this._shoots.length; j++) {
			let shootX = this._shoots[j].getPosition()[0];
			let shootY = this._shoots[j].getPosition()[1];
			if (
				shootY >= this._coordinates.y &&
				shootY <= this._coordinates.y + this._zoomedHeight &&
				shootX >= this._coordinates.x &&
				shootX <= this._coordinates.x + this._zoomedWidth
			) {
				console.log("HIT");
				this._shoots[j].hit();
				this._live--;
				score();
			}
			this._shoots[j].getPosition()[0];
		}
	}
	private _dead() {
		if (this._live <= 0) {
			this._handler.removeEnemy(this);
			this._context.clearRect(
				this._coordinates.x - this._speed.x,
				this._coordinates.y,
				this._zoomedWidth,
				this._zoomedHeight
			);
		}
	}
}
