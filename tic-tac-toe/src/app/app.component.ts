import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';
import { connect } from './socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tic-tac-toe';
  users: any = [];
  constructor(private userServiceService: UserServiceService) {
    connect();
    this.userServiceService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  get usersExist() {
    return this.users.length === 2;
  }

  oneUserExists() {
    return this.users.length >= 1;
  }
}
