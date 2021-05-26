import { Enemy } from './enemy';
import { getContext } from '../../helper/gameHelper';
import { getScaledTileSize, getTileSize } from '../../helper/gameSettings';

export class EnemyL1 extends Enemy {
  _live = 1;
  private _tileFrameX: number = 0;
  private _tileFrameY: number = 2;
  private animationCounter: number = 0;
  /**
   * renders the enemy image
   */
  _renderImg(): void {
    this._changeTileFrame();
    getContext().drawImage(
      this._sheet,
      getTileSize() * this._tileFrameX,
      getTileSize() * this._tileFrameY,
      getTileSize(),
      getTileSize(),
      this._enemyColumn.getX,
      this._y,
      getScaledTileSize(),
      getScaledTileSize()
    );
  }

  /**
   * Changes the displayed image for a animation.
   */
  private _changeTileFrame(): void {
    if (this.animationCounter >= 100) {
      this.animationCounter = 0;
      this._tileFrameX = this._tileFrameX < 1 ? +1 : 0;
    }
    this.animationCounter++;
  }
}
