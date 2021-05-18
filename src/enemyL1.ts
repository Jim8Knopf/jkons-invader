import { Enemy } from "./enemy";
import { EnemyColumn } from "./enemyColumn";
import { getContext } from "./gameHelper";
import { getScaledTileSize, getTileSize } from "./gameSettings";

export class EnemyL1 extends Enemy {
	private _tileFrameX = 0;
	private _tileFrameY = 2;
	_renderImg(): void {
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
}
