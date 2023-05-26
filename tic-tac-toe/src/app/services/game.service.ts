import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sendMessage } from '../socket-io';

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

  static grid: any[] = ['', '', '', '', '', '', '', '', ''];
  static winningIndexes: any = [];

  gridUpdated(grid: any[]) {
    for (let i = 0; i < grid.length; i++) {
      GameService.grid[i] = grid[i];
    }
  }

  winningIndexesUpdated(winningIndexes: any[]) {
    for (let i = 0; i < winningIndexes.length; i++) {
      GameService.winningIndexes.push(winningIndexes[i]);
    }
    if (winningIndexes.length === 0) {
      while (GameService.winningIndexes.length > 0) {
        GameService.winningIndexes.pop();
      }
    }
  }
  getGridValue(): Observable<any[]> {
    return of(GameService.grid);
  }

  getWinningIndexes(): Observable<any[]> {
    return of(GameService.winningIndexes);
  }

  setGridValue(index: any, value: any) {
    sendMessage('setGridValue', { index: index, value: value });
  }

  resetGame() {
    sendMessage('resetGame', null);
  }
}
