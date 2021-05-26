import { Injectable } from '@angular/core';
import { Player } from './player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  players: Array<Player> = new Array();

  constructor() {}

  newPlayer(addedPlayer: Player): void {
    this.players.push(addedPlayer);
  }

  getPlayers(): Array<Player> {
    return this.players;
  }
}
