import { EnemyCorp } from "../objects/enemy/enemyCorp";
import { Player } from "../objects/player";
import { Shot } from "../objects/shot";

// TODO Maybe export object functions here to the object classes
let players: Array<Player> = new Array();
let shots: Array<Shot> = new Array();
let enemyCorp: EnemyCorp;

export function newPlayer(left: string, right: string, fire: string): void {
	players.push(new Player(left, right, fire));
}

export function getPlayers(): Array<Player> {
	return players;
}

export function getShots(): Array<Shot> {
	return shots;
}

export function addShot(shot: Shot) {
	shots.push(shot);
}

export function initEnemyCorp() {
	enemyCorp = new EnemyCorp(16, 4);
}

export function getEnemyCorp() {
	return enemyCorp;
}
