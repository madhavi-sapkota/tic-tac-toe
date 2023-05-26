import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sendMessage } from '../socket-io';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}

  private static users: any[] = [];
  private static userSymbols: any = {};
  private static userScores: any = {};
  private static nextSymbol: string = 'X';

  symbols = ['X', 'O'];

  // observables
  getUsers(): Observable<any[]> {
    return of(UserServiceService.users);
  }

  addUsers(userInfo: any[]) {
    sendMessage('usersAdded', userInfo);
  }

  // handlers
  usersUpdated(users: any[]) {
    users.forEach((user) => {
      UserServiceService.users.push(user);
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
}
