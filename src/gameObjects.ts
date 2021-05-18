import { Player } from "./player";
import { Shot } from "./shot";

// TODO Maybe export object functions here to the object classes

let shots: Array<Shot> = new Array();
let players: Array<Player> = new Array();

export function newPlayer(left: string, right: string, fire: string): Player {
	const player: Player = new Player(left, right, fire);
	players.push(player);
	return player;
}

export function getShots(): Array<Shot> {
	return shots;
}

export function addShot(shot: Shot) {
	shots.push(shot);
}
