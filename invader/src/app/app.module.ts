import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';
// import { PlayerComponent } from './objects/player/player.component';

@NgModule({
  declarations: [AppComponent, ScoreboardComponent,GameComponent, MenuComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
