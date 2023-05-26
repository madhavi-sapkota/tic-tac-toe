import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  winningIndexes: any[] = [];

  @Input() userIndex: any;
  constructor(
    private userServiceService: UserServiceService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.gameService.getWinningIndexes().subscribe((value) => {
      this.winningIndexes = value;
    });
  }

  get player() {
    return this.userServiceService.getUsersWithSymbol(this.userIndex);
  }

  get score() {
    return this.userServiceService.getScoreByUser(this.player.userName);
  }

  get isMyTurn() {
    if (this.winningIndexes.length > 0) {
      return false;
    }

    let nextSymbol = this.userServiceService.getNextSymbol();
    return this.player.symbol === nextSymbol;
  }
}
