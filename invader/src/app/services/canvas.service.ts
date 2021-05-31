import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private _canvas!: HTMLCanvasElement;

  private _context: CanvasRenderingContext2D | null = null;
  constructor() {}

  set setCanvas(canvas: HTMLCanvasElement) {
      this._canvas = canvas;
      this._context = this._canvas.getContext("2d");
  }

  
  get getCanvas(): HTMLCanvasElement {
      return this._canvas;
  }
  
  get getContext(): CanvasRenderingContext2D | null {
    return this._context;
  }
}
