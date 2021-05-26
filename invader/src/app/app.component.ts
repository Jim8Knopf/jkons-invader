import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { init } from './helper/gameHelper';
import { CanvasService } from './services/canvas.service';
import { SettingsService } from './services/settings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  @ViewChild('jkonsInvader', { static: true })
  _canvasElemetRef: ElementRef<HTMLCanvasElement> | null = null;

  constructor(private _canvasService: CanvasService, private _settingsService: SettingsService) {}

  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    if (this._canvasElemetRef) {
      this._canvasService.setCanvas = this._canvasElemetRef;
      this._settingsService.setCanvasSize();
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // TODO init durch einbindung
    // newPlayer('a', 'd', ' ');
    // document.addEventListener('keyup', (keyboard) => {
    //   if (!getGameOverState()) {
    //     gameState(keyboard);
    //   }
    // });
    // initClickListener();
    // initEnemyCorp();
  }
}
