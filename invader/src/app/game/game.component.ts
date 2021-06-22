import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../objects/services/player.service';
import { CanvasService } from '../services/canvas.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'jkons-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('jkonsInvader', {static: true})
  _canvasElementRef!: ElementRef<HTMLCanvasElement>;
  
  constructor(
    private _canvasService: CanvasService, 
    private _settingsService: SettingsService, 
    private _playerService: PlayerService
    ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._canvasService.setCanvas = this._canvasElementRef.nativeElement;
    this._settingsService.setCanvasSize();
    this._playerService.newPlayer('a', 'd', ' ');
    this._playerService.getPlayers.forEach((player) => {
      this._playerService.handleInput();
      this._playerService.handleGamepadInput();
    });
    }
  
    private setCanvasSize(): void {
      this._resizeCanvas();
    
      // Webkit/Blink will fire this on load, but Gecko doesn't.
      window.addEventListener("resize", () => {
        this._resizeCanvas();
      });
      // downSpeed = (getScaledTileSize() * 2) / 3;
      // enemyGap = getScaledTileSize() / 6;
    }
    private _resizeCanvas(): void {
      const _canvas = this._canvasService.getCanvas;
    
      let body: HTMLElement = document.body;
      let html = document.documentElement;
    
      let height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      let width =
        Math.max(
          body.scrollWidth,
          body.offsetWidth,
          html.clientWidth,
          html.scrollWidth,
          html.offsetWidth
        ) - 500;
      let canvasSize = width > height ? height : width;
      // height -= 5;
      // size = 225 * zoom;
      // console.log(body.clientWidth);
      // console.log(body.offsetWidth);
      // console.log(body.scrollWidth);
    
      // Set canvas height and with in JS, because with and height set in CSS distort drawn shapes
      _canvas.width = canvasSize;
      _canvas.height = canvasSize;
      (
        document.getElementById("pageLayout") as HTMLDivElement
      ).style.gridTemplateColumns = `20% ${canvasSize}px auto`;
      // _scaledTileSize = canvasSize / (getEnemys() + 8);
      // getContext().imageSmoothingEnabled = false;
    }
}
