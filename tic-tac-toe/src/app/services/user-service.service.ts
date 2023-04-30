import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}
  private users: any[] = [];
  private userSymbols: any = {};

  symbols = ['X', 'O'];

  // make it observable
  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  addUsers(userInfo: any[]) {
    userInfo.forEach((user: any) => {
      this.users.push(user);
    });

    // first user
    let firstUserSymbol = this.symbols[Math.floor(Math.random() * 2)];
    this.userSymbols[this.users[0]] = firstUserSymbol;
    // second user
    let secondUserSymbol = this.symbols.find((x) => x !== firstUserSymbol);
    this.userSymbols[this.users[1]] = secondUserSymbol;
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
}
