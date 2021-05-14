export class shoot {
    constructor(context) {
        this._shootLength = 10;
        this._shootThickness = 5;
        this._shootSpeed = 20;
        this._context = context;
        this._positionX = 0;
        this._positionY = 0;
    }
    /**
     * shoot if there is no actual shoot an the field
     */
    shoot(positionX, positionY) {
        if (this._positionY <= 0) {
            this._clearShoot();
            this._positionX = positionX;
            this._positionY = positionY;
        }
    }
    /**
     * hit should be called when anything is hitten by the shot
     */
    hit() {
        this._clearShoot();
        this._positionY = 0;
    }
    /**
     * this function checks if the shoot is in the field
     * than it clears the old shoot
     * than it moves the shoot up and paint it
     */
    shootMovement() {
        if (this._positionY <= 0) {
            this._positionY = 0;
            this._clearShoot();
            return;
        }
        this._clearShoot();
        this._positionY -= this._shootSpeed;
        this._renderShoot();
    }
    /**
     * getPositionX
     */
    get getPositionX() {
        return this._positionX;
    }
    /**
     * getPositionY
     */
    get getPositionY() {
        return this._positionY;
    }
    /**
     * shootRender
     */
    _renderShoot() {
        this._context.fillStyle = "red";
        this._context.fillRect(this._positionX - this._shootThickness / 2, this._positionY - this._shootLength, this._shootThickness, this._shootLength);
    }
    /**
     * this function clears the current shoot
     */
    _clearShoot() {
        this._context.clearRect(this._positionX - this._shootThickness / 2, this._positionY - this._shootLength, this._shootThickness + 0.5, this._shootLength + 0.1);
    }
}
//# sourceMappingURL=shoot.js.map