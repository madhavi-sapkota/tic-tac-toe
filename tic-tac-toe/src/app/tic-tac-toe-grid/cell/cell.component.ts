import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() Index: any;
  grid: any;
  winningIndexes: any;

  constructor(
    private userServiceService: UserServiceService,
    private gameService: GameService
  ) {
    this.gameService.getGridValue().subscribe((grid) => {
      this.grid = grid;
    });
    this.gameService.getWinningIndexes().subscribe((winningIndexes) => {
      this.winningIndexes = winningIndexes;
    });
  }

  get amIWinningIndex() {
    return this.winningIndexes.includes(this.Index);
  }

  get gameOver() {
    return this.winningIndexes.length !== 0;
  }

  onCellClicked() {
    if (this.grid[this.Index] === '' && !this.gameOver) {
      let newValue = this.userServiceService.getNextSymbol();
      this.gameService.setGridValue(this.Index, newValue);
      if (this.gameOver) {
        let currentSymbol = this.grid[this.Index];
        let currentUser =
          this.userServiceService.getUserNameBySymbol(currentSymbol);
        this.userServiceService.addUserScores(currentUser);
      }
      this.userServiceService.setNextSymbol();
    }
  }
}
