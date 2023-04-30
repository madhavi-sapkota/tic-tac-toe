import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private UserServiceService: UserServiceService) {}
  users = ['', ''];

  onClick() {
    this.UserServiceService.addUsers(this.users);
  }
}
