import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
@Component({
  selector: 'app-tic-tac-toe-grid',
  templateUrl: './tic-tac-toe-grid.component.html',
  styleUrls: ['./tic-tac-toe-grid.component.css'],
})
export class TicTacToeGridComponent {
  constructor(private UserServiceService: UserServiceService) {}
  grid = ['A', 'b', 'c', 'd', '', 'g', '', 'l', ''];

  
}
