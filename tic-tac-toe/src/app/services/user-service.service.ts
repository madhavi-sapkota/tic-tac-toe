import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}
  private users: any[] = [];
  private userSymbols: any = {};

  symbols = ['X', 'O'];

  // make it observable
  getUsers() {
    return this.users;
  }

  addUsers(userInfo: any) {
    this.users = userInfo;
    // first user
    let firstUserSymbol = this.symbols[Math.floor(Math.random() * 2)];
    this.userSymbols[this.users[0]] = firstUserSymbol;
    // second user
    let secondUserSymbol = this.symbols.find((x) => x !== firstUserSymbol);
    this.userSymbols[this.users[1]] = secondUserSymbol;

    console.log(this.userSymbols);
  }
}
