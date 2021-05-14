export class GameSettings {
    constructor(canvas) {
        this._zoom = 1;
        this.size = 0;
        this._canvas = canvas;
        this.resizeCanvas();
        // Webkit/Blink will fire this on load, but Gecko doesn't.
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });
    }
    resizeCanvas() {
        // resize canvas if the window size reached a specific size
        if (innerHeight <= 450) {
            this.zoom = 1;
        }
        else if (innerHeight <= 690 || innerWidth <= 675) {
            this.zoom = 2;
        }
        else if (innerHeight <= 915 || innerWidth <= 900) {
            this.zoom = 3;
        }
        else {
            this.zoom = 4;
        }
        this.size = 225 * this.zoom;
        // Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
        this._canvas.width = this.size;
        this._canvas.height = this.size;
    }
    ;
    set zoom(zoom) {
        this._zoom = zoom;
    }
    get zoom() {
        return this._zoom;
    }
}
//# sourceMappingURL=game-settings.js.map