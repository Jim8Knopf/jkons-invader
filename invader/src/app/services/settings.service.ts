import { ElementRef, HostListener, Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  enemyGap: number = 0;
  downSpeed: number = 0;
  _scaledTileSize: number = 0;
  _tileSize: number = 9;
  
  // game settings
  enemys: number = 18;
  rows: number = 4;
  newEnemys: number = 12;

  constructor(private _canvasService: CanvasService) { }
  
  setCanvasSize(): void {
    this._resizeCanvas();

  this.downSpeed = (this.getScaledTileSize * 2) / 3;
  this.enemyGap = this.getScaledTileSize / 6;
}

  get getTileSize(): number {
    return this._tileSize;
  }

  get getScaledTileSize(): number {
    return this._scaledTileSize;
  }

  _resizeCanvas(): void {
  const _canvas: HTMLCanvasElement = this._canvasService.getCanvas;

  const body: HTMLElement = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const width =
    Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    ) - 500;
  const canvasSize = width > height ? height : width;

  // Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
  _canvas.width = canvasSize;
  _canvas.height = canvasSize;
  (
    document.getElementById('pageLayout') as HTMLDivElement
  ).style.gridTemplateColumns = `20% ${canvasSize}px auto`;
  this._scaledTileSize = canvasSize / (this.getEnemys + 8);

  if (this._canvasService.getContext) {
    this._canvasService.getContext.imageSmoothingEnabled = false;
  }
}

get getEnemys(): number {
  return this.enemys;
}
get getRows(): number {
  return this.rows;
}
get getNewEnemys(): number {
  return this.newEnemys;
}
get getEnemyGap(): number {
  return this.enemyGap;
}
get getDownSpeed(): number {
  return this.downSpeed;
}

}
