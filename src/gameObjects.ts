import { EnemyRow } from "./enemyRow";
import { getScaledTileSize } from "./gameSettings";
import { Player } from "./player";
import { Shot } from "./shot";

// TODO Maybe export object functions here to the object classes

let shots = new Array();
let players = new Array();
const shot: Shot = new Shot();

export function newPlayer(left: string, right: string, fire: string): Player {
	const player: Player = new Player(left, right, fire);

	shots.push(shot);
	players.push(player);

	return player;
}

export function getShot(): Shot {
	return shot;
}

export function getShots(): Shot[] {
	return shots;
}

// TODO Enemy Row Handler
let enemyRows = new Array();
export function initEnemyRows() {
	for (let i = 0; i < 3; i++) {
		enemyRows.push(new EnemyRow(15, 0, i * getScaledTileSize(), 2));
	}
}

export function getEnemyRow(): EnemyRow[] {
	return enemyRows;
}
