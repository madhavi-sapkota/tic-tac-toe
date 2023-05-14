import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  player: any;
  winningIndexes: any[] = [];
  @Input() userIndex: any;
  constructor(
    private userServiceService: UserServiceService,
    private gameService: GameService
  ) {
    this.gameService.getWinningIndexes().subscribe((value) => {
      this.winningIndexes = value;
    });
  }

  ngOnInit() {
    this.player = this.userServiceService.getUsersWithSymbol(this.userIndex);
  }

  get isMyTurn() {
    if (this.winningIndexes.length > 0) {
      return false;
    }

    let nextSymbol = this.userServiceService.getNextSymbol();
    return this.player.symbol === nextSymbol;
  }
}
