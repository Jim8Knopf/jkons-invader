export class Enemy {
	private _context: CanvasRenderingContext2D;

	private _coordinates: { x: number; y: number } = { x: 0, y: 0 };
	private _speed: { dx: number; dy: number } = { dx: 0.5, dy: 1 };
	private _size: { width: number; height: number };
	private _sheet = new Image();
	private _tileSize = 9;
	private _border: number;

	constructor(
		context: CanvasRenderingContext2D,
		x?: number,
		y?: number,
		border?: number
	) {
		this._sheet.src = "../img/ji-sheet.png";
		this._context = context;
		this._size = {
			width: this._sheet.width * 2,
			height: this._sheet.height * 4,
		};
		this._speed.dy = this._size.height;

		if (x) this._coordinates.x = x;
		if (y) this._coordinates.y = y;

		if (border) this._border = border - this._size.height;
		else this._border = this._context.canvas.height - this._size.height;
	}

	// start enemy
	public moveEnemy(): void {
		this._context.drawImage(
			this._sheet,
			9,
			0,
			this._tileSize,
			this._tileSize,
			this._coordinates.x,
			this._coordinates.y,
			this._size.width,
			this._size.height
		);
		this.enemyMovement();
	}

	public enemyMovement() {
		if (
			this._coordinates.x + this._size.width >=
				this._context.canvas.width - 9 ||
			this._coordinates.x - 9 <= 0
		) {
			this._speed.dx = -this._speed.dx;
			this._coordinates.y += this._speed.dy;
		}

		if (this._coordinates.y >= this._border) {
			this._speed.dy = 0;
			this._speed.dx = 0;
		}

		this._coordinates.x += this._speed.dx;
	}
}
