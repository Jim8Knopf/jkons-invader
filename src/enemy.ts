export class Enemy {
  private context: CanvasRenderingContext2D;

  private coordinates: { x: number; y: number } = { x: 0, y: 0 };
  private speed: { dx: number; dy: number } = { dx: 0.5, dy: 1 };
  private size: { width: number; height: number };
  private sheet = new Image();
  private tileSize = 9;
  private border: number;

  constructor(
    context: CanvasRenderingContext2D,
    x?: number,
    y?: number,
    border?: number
  ) {
    this.sheet.src = "../img/ji-sheet.png";
    this.context = context;
    this.size = { width: this.sheet.width * 2, height: this.sheet.height * 4 };
    this.speed.dy = this.size.height;

    if (x) this.coordinates.x = x;
    if (y) this.coordinates.y = y;

    if (border) this.border = border - this.size.height;
    else this.border = this.context.canvas.height - this.size.height;
  }

  // start enemy
  public moveEnemy(): void {
    this.context.drawImage(
      this.sheet,
      9,
      0,
      this.tileSize,
      this.tileSize,
      this.coordinates.x,
      this.coordinates.y,
      this.size.width,
      this.size.height
    );
    this.enemyMovement();
  }

  public enemyMovement() {
    if (
      this.coordinates.x + this.size.width >= this.context.canvas.width - 9 ||
      this.coordinates.x - 9 <= 0
    ) {
      this.speed.dx = -this.speed.dx;
      this.coordinates.y += this.speed.dy;
    }

    if (this.coordinates.y >= this.border) {
      this.speed.dy = 0;
      this.speed.dx = 0;
    }

    this.coordinates.x += this.speed.dx;
  }
}
