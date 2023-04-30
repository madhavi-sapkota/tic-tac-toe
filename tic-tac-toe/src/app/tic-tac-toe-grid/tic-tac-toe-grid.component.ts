import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-grid',
  templateUrl: './tic-tac-toe-grid.component.html',
  styleUrls: ['./tic-tac-toe-grid.component.css'],
})
export class TicTacToeGridComponent {
  grid = ['A', 'b', 'c', 'd', '', 'g', '', 'l', ''];
}
