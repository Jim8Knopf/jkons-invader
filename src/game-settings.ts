export class GameSettings {
  private _zoom: number = 1;
  // Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
  private _canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement, zoom?: number) {
    if (zoom) {
      this._zoom = zoom;
    }

    this._canvas = canvas;
    this._canvas.width = 900;
    this._canvas.height = 900;

    function resizeCanvas() {
      canvas.width = innerWidth;
        canvas.height = innerHeight;
    };
    
    // Webkit/Blink will fire this on load, but Gecko doesn't.
    window.onresize = resizeCanvas;
    
    // So we fire it manually...
    resizeCanvas();
  }
  
  public get zoom(): number {
    return this._zoom;
  }
  
}