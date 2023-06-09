import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicTacToeGridComponent } from './tic-tac-toe-grid/tic-tac-toe-grid.component';
import { CellComponent } from './tic-tac-toe-grid/cell/cell.component';
import { UsersComponent } from './users/users.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlayerComponent } from './player/player.component';
import { RestartComponent } from './restart/restart.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetGameComponent } from './reset-game/reset-game.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeGridComponent,
    CellComponent,
    UsersComponent,
    PlayerComponent,
    RestartComponent,
    ResetGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
