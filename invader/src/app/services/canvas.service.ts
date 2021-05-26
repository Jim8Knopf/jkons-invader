import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  private _canvas!: ElementRef<HTMLCanvasElement>;
  private _context: CanvasRenderingContext2D | null = null;
  constructor() {}

  set setCanvas(canvas: ElementRef<HTMLCanvasElement>) {
    if (canvas) {
      this._canvas = canvas;
      this._context = this._canvas.nativeElement.getContext("2d");
    }
  }

  
  get getCanvas(): HTMLCanvasElement {
      return this._canvas.nativeElement;
  }
  
  get getContext(): CanvasRenderingContext2D | null {
    return this._context;
  }
}
