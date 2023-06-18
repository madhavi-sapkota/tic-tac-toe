import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sendMessage } from '../socket-io';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL = 'https://play-tic-tac-toe.azurewebsites.net';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient | null) {}

  private static users: any[] = [];
  private static userSymbols: any = {};
  private static userScores: any = {};
  private static nextSymbol: string = 'X';

  symbols = ['X', 'O'];

  // observables
  getUsers(): Observable<any[]> {
    return of(UserServiceService.users);
  }

  addUser(userInfo: string) {
    sendMessage('userAdded', userInfo);
  }

  // handlers
  usersUpdated(users: any[]) {
    users.forEach((user) => {
      if (!UserServiceService.users.includes(user)) {
        UserServiceService.users.push(user);
      }
    });
  }
  userSymbolUpdated(userSymbols: any) {
    UserServiceService.userSymbols = userSymbols;
  }
  userScoresUpdated(userScores: any) {
    UserServiceService.userScores = userScores;
  }
  nextSymbolUpdated(nextSymbol: string) {
    UserServiceService.nextSymbol = nextSymbol;
  }

  // getters
  getUserNameBySymbol(symbol: string) {
    let userNames = Object.keys(UserServiceService.userSymbols);
    for (let i = 0; i < userNames.length; i++) {
      if (UserServiceService.userSymbols[userNames[i]] === symbol) {
        return userNames[i];
      }
    }
    return null;
  }
  getUsersWithSymbol(index: number) {
    let user = UserServiceService.users[index];
    let userSymbol = UserServiceService.userSymbols[user];
    let userData = {
      userName: user,
      symbol: userSymbol,
    };
    return userData;
  }
  getScoreByUser(user: string) {
    return UserServiceService.userScores[user];
  }
  getNextSymbol() {
    return UserServiceService.nextSymbol;
  }

  getUserFromApi() {
    return this.http?.get<any[]>(`${API_BASE_URL}/users`).subscribe((users) => {
      users.forEach((user) => {
        UserServiceService.users.push(user);
      });
    });
  }

  getUserSymbolFromApi() {
    return this.http
      ?.get<any[]>(`${API_BASE_URL}/user-symbols`)
      .subscribe((userSymbols) => {
        UserServiceService.userSymbols = userSymbols;
      });
  }

  getNextSymbolFromApi() {
    return this.http
      ?.get<string>(`${API_BASE_URL}/next-symbol`)
      .subscribe((nextSymbols) => {
        UserServiceService.nextSymbol = nextSymbols;
      });
  }

  getUserScoresFromApi() {
    return this.http
      ?.get<any>(`${API_BASE_URL}/user-scores`)
      .subscribe((userScores) => {
        UserServiceService.userScores = userScores;
      });
  }
}
