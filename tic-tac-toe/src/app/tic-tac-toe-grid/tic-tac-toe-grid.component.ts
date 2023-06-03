import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-tic-tac-toe-grid',
  templateUrl: './tic-tac-toe-grid.component.html',
  styleUrls: ['./tic-tac-toe-grid.component.css'],
})
export class TicTacToeGridComponent implements OnInit {
  constructor(
    private userServiceService: UserServiceService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.getGridFromApi();
    this.gameService.getWinningIndexesFromApi();
  }
}
