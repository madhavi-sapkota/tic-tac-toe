import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
const winnersCollection = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  grid: any[] = ['', '', '', '', '', '', '', '', ''];
  winningIndexes: any = [];

  getGridValue(): Observable<any[]> {
    return of(this.grid);
  }

  getWinningIndexes(): Observable<any[]> {
    return of(this.winningIndexes);
  }

  setGridValue(index: any, value: any) {
    this.grid[index] = value;
    winnersCollection.forEach((winners) => {
      if (
        this.grid[winners[0]] === this.grid[winners[1]] &&
        this.grid[winners[1]] === this.grid[winners[2]] &&
        this.grid[winners[0]] !== ''
      ) {
        winners.forEach((winner) => {
          this.winningIndexes.push(winner);
        });
      }
    });
  }

  resetGame() {
    while (this.winningIndexes.length > 0) {
      this.winningIndexes.pop();
    }
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = '';
    }
  }
}
