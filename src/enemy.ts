export class Enemy {
  private _context: CanvasRenderingContext2D;

  // TODO maybe a tile service
  private _sheet = new Image();
  private _tileFrameX = 0;
  private _tileFrameY = 2;
  // TODO get tile from tile config
  private _tileWidth: number = 9;
  private _tileHeight: number = 9;
  private _spriteChangeCounter = 0;
  // TODO get zoom from game settings
  private _zoom = 5;
  private _zoomedWidth: number = this._tileWidth * this._zoom;
  private _zoomedHeight: number = this._tileHeight * this._zoom;

  private _coordinates: { x: number; y: number } = { x: 0, y: 0 };
  private _speed: { x: number; y: number } = { x: 1, y: this._zoomedHeight };
  private _canvasCollision: {
    right: number,
    left: number,
    top: number,
    bottom: number 
  };

  constructor(
    context: CanvasRenderingContext2D,
    x?: number,
    y?: number,
  ) {
    this._context = context;
    if (x) this._coordinates.x = x;
    if (y) this._coordinates.y = y;

    this._canvasCollision = { 
      right: this._context.canvas.width - this._zoomedWidth,
      left: 0,
      top: 0,
      bottom: this._context.canvas.width - this._zoomedHeight * 4
    }
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
        this._zoomedHeight,
    );
}

  public enemyMovement() {
    this._context.clearRect(this._coordinates.x - this._speed.x, this._coordinates.y, this._zoomedWidth, this._zoomedHeight);
    this.renderEnemy();
    // d
    if (this._coordinates.y <= this._canvasCollision.bottom) {
      // detect if enemy hits left or right border
      if (this._coordinates.x > this._canvasCollision.right || this._coordinates.x < this._canvasCollision.left) {
        // invert x direction
        this._speed.x = -this._speed.x;
        // put's enemy in the next column
        this._coordinates.y += this._speed.y;
        // clear enemy on row change
        this._context.clearRect(this._coordinates.x, this._coordinates.y - this._speed.y, this._zoomedWidth, this._zoomedHeight);
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
      if (this._tileFrameX < 1)
        this._tileFrameX++;
      else
        this._tileFrameX = 0;
    }
    else {
      this._spriteChangeCounter++;
    }
  }

  public get zoom(): number {
    return this._zoom
  }

  public get tileWidth(): number {
    return this._tileWidth;
  }

  public get tileHeight(): number {
    return this._tileHeight;
  }
}
