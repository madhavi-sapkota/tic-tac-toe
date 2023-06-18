import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sendMessage } from '../socket-io';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../urls';

const API_BASE_URL = serverUrl;

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
  constructor(private http: HttpClient | null) {}

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

  getGridFromApi() {
    return this.http?.get<any[]>(`${API_BASE_URL}/grid`).subscribe((grid) => {
      for (let i = 0; i < grid.length; i++) {
        GameService.grid[i] = grid[i];
      }
    });
  }

  getWinningIndexesFromApi() {
    return this.http
      ?.get<any[]>(`${API_BASE_URL}/winning-indexes`)
      .subscribe((winningIndexes) => {
        if (GameService.winningIndexes.length === 0) {
          winningIndexes.forEach((winningIndex) => {
            GameService.winningIndexes.push(winningIndex);
          });
        }
      });
  }
}
