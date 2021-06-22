import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { PlayerService } from './objects/services/player.service';
import { CanvasService } from './services/canvas.service';
import { SettingsService } from './services/settings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  // @ViewChild('jkonsInvader', {static: false})
  
  // @HostListener('window:resize', ['$event'])
    
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
  // * Private Functions
/**
 * Starts the game.
 */
// public  _start() {
//   if (!_gameStarted) {
//     _playerGuideGif.src = 'assets/img/player-guide.png';
//     playTitleTheme();
//     vanishForm();
//     _gameStarted = true;
//     setAnimationState(true);
//     resetScore();
//     update();
//     // _startButton.innerHTML = 'start';
//     // _startButton.disabled = true;
//     // _stopButton.disabled = false;
//     // _resetButton.disabled = false;
//   }
// }
}
