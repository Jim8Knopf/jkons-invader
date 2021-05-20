import { Enemy } from "./enemy";
import { getContext } from "../../helper/gameHelper";
import { getScaledTileSize, getTileSize } from "../../helper/gameSettings";

export class EnemyL1 extends Enemy {
	_live = 1;
	private _tileFrameX: number = 0;
	private _tileFrameY: number = 2;
	/**
	 * renders the enemy image
	 */
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
