export class Shot {
    constructor(context) {
        this._velocity = 20;
        // defines the shot length and thickness for the drawing of shot
        this._length = 10;
        this._thickness = 5;
        this._context = context;
        this._x = 0;
        this._y = 0;
    }
    /**
     * shoot if there is no actual shoot an the field
     */
    shoot(positionX, positionY) {
        if (this._y <= 0) {
            this._clear();
            this._x = positionX;
            this._y = positionY;
        }
    }
    /**
     * hit should be called when anything is hitten by the shot
     */
    hit() {
        this._clear();
        this._y = 0;
    }
    /**
     * checks if the shoot is in the field
     * than it clears the old shoot
     * than it moves the shoot up and paint it
     */
    shootAnimation() {
        if (this._y <= 0) {
            this._clear();
        }
        this._clear();
        this._y -= this._velocity;
        this._render();
    }
    /**
     * clears the current shoot
     */
    _clear() {
        this._context.clearRect(this._x - this._thickness / 2, this._y - this._length, this._thickness + 0.5, this._length + 0.1);
    }
    /**
     * draws the shot on screen
     */
    _render() {
        this._context.fillStyle = "red";
        this._context.fillRect(this._x - this._thickness / 2, this._y - this._length, this._thickness, this._length);
    }
    /**
     * get x position of the shot
     */
    get getX() {
        return this._x;
    }
    /**
     * get y position of the shot
     */
    get getY() {
        return this._y;
    }
}
//# sourceMappingURL=shot.js.map