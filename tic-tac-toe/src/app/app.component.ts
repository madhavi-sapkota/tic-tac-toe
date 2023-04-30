import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tic-tac-toe';
  users: any = [];
  constructor(private UserServiceService: UserServiceService) {
    this.users = this.UserServiceService.getUsers();
  }

  get usersExist() {
    return this.users.length === 2;
  }
}
