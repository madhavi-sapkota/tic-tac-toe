import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicTacToeGridComponent } from './tic-tac-toe-grid/tic-tac-toe-grid.component';
import { CellComponent } from './tic-tac-toe-grid/cell/cell.component';
import { UsersComponent } from './tic-tac-toe-grid/users/users.component';

@NgModule({
  declarations: [AppComponent, TicTacToeGridComponent, CellComponent, UsersComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
