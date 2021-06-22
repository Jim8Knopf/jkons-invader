import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jkons-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private _gameStarted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * start
   */
  public start() {
    alert("test");
    if (!this._gameStarted) {
      // _playerGuideGif.src = 'assets/img/player-guide.png';
      // playTitleTheme();
      // vanishForm();
      this._gameStarted = true;
      // setAnimationState(true);
      // resetScore();
      // update();
      // _startButton.innerHTML = 'start';
      // _startButton.disabled = true;
      // _stopButton.disabled = false;
      // _resetButton.disabled = false;
    }
  }

  /**
   * pause
   */
  public pause() {
    
  }

  /**
   * restart
   */
  public restart() {
    
  }

}
