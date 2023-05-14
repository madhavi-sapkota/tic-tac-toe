import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}
  private users: any[] = [];
  private userSymbols: any = {};
  private nextSymbol: string = 'X';
  private userScores: any = {};

  symbols = ['X', 'O'];

  // make it observable
  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  getUserWithScores = new BehaviorSubject<any>(this.userScores);

  addUsers(userInfo: any[]) {
    userInfo.forEach((user: any) => {
      this.users.push(user);
    });

    // first user
    let firstUserSymbol = this.symbols[Math.floor(Math.random() * 2)]; // to assign randomly 0 or 1 as index of symbols
    this.userSymbols[this.users[0]] = firstUserSymbol; // symbol for user at index 0
    this.userScores[this.users[0]] = 0;
    // second user
    let secondUserSymbol = this.symbols.find((x) => x !== firstUserSymbol);
    this.userSymbols[this.users[1]] = secondUserSymbol; // symbol for user at index 1
    this.userScores[this.users[1]] = 0;
  }

  addUserScores(user: any) {
    let userScores = this.userScores;
    let userName = user;
    let newValue = userScores[userName] + 1;
    userScores[userName] = newValue;
    this.getUserWithScores.next(userScores);
  }

  getUserNameBySymbol(symbol: string) {
    let userNames = Object.keys(this.userSymbols);
    for (let i = 0; i < userNames.length; i++) {
      if (this.userSymbols[userNames[i]] === symbol) {
        return userNames[i];
      }
    }
    return null;
  }

  getUsersWithSymbol(index: number) {
    let user = this.users[index];
    let userSymbol = this.userSymbols[user];

    let userData = {
      userName: user,
      symbol: userSymbol,
    };

    return userData;
  }

  getNextSymbol() {
    return this.nextSymbol;
  }

  setNextSymbol() {
    this.nextSymbol = this.nextSymbol === 'X' ? 'O' : 'X';
  }
}
