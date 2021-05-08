export class Enemy {
	private context: CanvasRenderingContext2D;

	// TODO maybe a tile service
	private sheet = new Image();
	private tileFrameX = 0;
	private tileFrameY = 2;
	// TODO get tile from tile config
	private tileWidth: number = 9;
	private tileHeight: number = 9;

	// TODO get zoom from game settings
	private zoom = 5;
	private zoomedWidth: number = this.tileWidth * this.zoom;
	private zoomedHeight: number = this.tileHeight * this.zoom;

	private coordinates: { x: number; y: number } = { x: 0, y: 0 };
	private speed: { x: number; y: number } = { x: 2, y: this.zoomedHeight };
	private canvasCollision: {
		right: number;
		left: number;
		top: number;
		bottom: number;
	};

	constructor(context: CanvasRenderingContext2D, x?: number, y?: number) {
		this.context = context;
		if (x) this.coordinates.x = x;
		if (y) this.coordinates.y = y;

		this.canvasCollision = {
			right: this.context.canvas.width - this.zoomedWidth,
			left: 0,
			top: 0,
			bottom: this.context.canvas.width - this.zoomedHeight * 4,
		};
		this.sheet.src = "../img/ji-sheet.png";
	}

	// Render enemy
	public renderEnemy(): void {
		this.context.drawImage(
			this.sheet,
			this.tileWidth * this.tileFrameX,
			this.tileWidth * this.tileFrameY,
			this.tileWidth,
			this.tileWidth,
			this.coordinates.x,
			this.coordinates.y,
			this.zoomedWidth,
			this.zoomedHeight
		);
	}

	public enemyMovement() {
		this.context.clearRect(
			this.coordinates.x - this.speed.x,
			this.coordinates.y,
			this.zoomedWidth,
			this.zoomedHeight
		);
		this.renderEnemy();
		if (
			this.coordinates.x > this.canvasCollision.right ||
			this.coordinates.x < this.canvasCollision.left
		) {
			this.speed.x = -this.speed.x;
			this.coordinates.y += this.speed.y;
		}
		if (this.coordinates.y > this.canvasCollision.bottom) {
			this.speed.y = 0;
			this.speed.x = 0;
		}

		this.coordinates.x += this.speed.x;
	}

	public getZoom(): number {
		return this.zoom;
	}

	public getTileWidth(): number {
		return this.tileWidth;
	}

	public getTileHeight(): number {
		return this.tileHeight;
	}
}
