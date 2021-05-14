import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
export class Player {
    constructor(context, shot, left, right, fire, zoom) {
        // complete tile sheet
        this._sheet = new Image();
        this._velocity = 4;
        // save a list of pressed keys to allow multiple pressed keys at the same time
        this.pressed_keys = [];
        // recognize when a key is down on the keyboard
        this._keydown = fromEvent(document, "keydown");
        this._keydown$ = this._keydown.pipe(map((event) => {
            // add key to pressed keys when pressed
            this.pressed_keys.push(event.key);
        }));
        // recognize when a key is up after a key was down on the keyboard
        this._keyup = fromEvent(document, "keyup");
        this._keyup$ = this._keyup.pipe(map((event) => {
            // remove key from pressed keys when not pressed anymore
            this.pressed_keys = this.pressed_keys.filter((k) => k !== event.key);
        }));
        this.keydownSubscription = this._keydown$.subscribe();
        this.keyupSubscription = this._keyup$.subscribe();
        this._tileSize = 9;
        // assign context
        this._context = context;
        // assign shot
        this._shot = shot;
        // assign player controls
        this._left = left;
        this._right = right;
        this._fire = fire;
        // assign zoomed size
        this._zoomedSize = zoom * this._tileSize;
        // assign coordinates
        this._y = context.canvas.height - this._zoomedSize;
        this._x = (context.canvas.width - this._zoomedSize) / 2;
        // assign tile sheet
        this._sheet.src = "../img/ji-sheet.png";
        // draw player on page load
        this._render(true);
    }
    handleInput() {
        // execute events of player on input
        if (this.pressed_keys.includes(this._left))
            this._moveLeft();
        if (this.pressed_keys.includes(this._right))
            this._moveRight();
        if (this.pressed_keys.includes(this._fire))
            this._fireShot();
        // update player
        this._clear();
        this._render();
    }
    // moves left but not out of the screen
    _moveLeft() {
        this._x = this._x - this._velocity >= 0 ? this._x - this._velocity : 0;
    }
    // moves right but not out of the screen
    _moveRight() {
        this._x =
            this._x + this._zoomedSize <= this._context.canvas.width
                ? this._x + this._velocity
                : this._x;
    }
    _fireShot() {
        this._shot.shoot(this._x + this._zoomedSize / 2, this._y);
    }
    // clear player on screen
    _clear() {
        this._context.clearRect(this._x - this._velocity, this._y, this._context.canvas.width, this._context.canvas.height);
    }
    // draw player on screen
    _render(onload) {
        if (onload) {
            const that = this;
            this._sheet.onload = function () {
                that._context.drawImage(that._sheet, 0, 0, 9, 9, that._x, that._y, that._zoomedSize, that._zoomedSize);
            };
        }
        else {
            this._context.drawImage(this._sheet, 0, 0, 9, 9, this._x, this._y, this._zoomedSize, this._zoomedSize);
        }
    }
}
//# sourceMappingURL=player.js.map