import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private UserServiceService: UserServiceService) {}
  users = ['', ''];

  ngOnInit(): void {
    this.UserServiceService.getUserFromApi();
  }

  onClick() {
    this.UserServiceService.addUsers(this.users);
  }
}
