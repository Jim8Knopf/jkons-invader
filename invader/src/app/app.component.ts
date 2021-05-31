import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PlayerService } from './objects/services/player.service';
import { CanvasService } from './services/canvas.service';
import { SettingsService } from './services/settings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  @ViewChild('jkonsInvader', {static: false})
  _canvasElemetRef!: ElementRef;
  
  constructor(private _canvasService: CanvasService, private _settingsService: SettingsService, private _playerService: PlayerService) {}

  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    this._canvasService.setCanvas = this._canvasElemetRef.nativeElement;
    this._settingsService.setCanvasSize();
    this._playerService.newPlayer('a', 'd', ' ');
    this._playerService.getPlayers.forEach((player) => {
      this._playerService.handleInput();
      this._playerService.handleGamepadInput();
    });
    }
    
    ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // TODO init durch einbindung
    // document.addEventListener('keyup', (keyboard) => {
    //   if (!getGameOverState()) {
    //     gameState(keyboard);
    //   }
    // });
    // initClickListener();
    // initEnemyCorp();
  }
}
