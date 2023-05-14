import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css'],
})
export class ScoreBoardComponent {
  usersScores: any;

  constructor(private userServiceService: UserServiceService) {
    this.userServiceService.getUserWithScores.subscribe((value) => {
      this.usersScores = value;
    });
  }
  userNames() {
    let userName = Object.keys(this.usersScores);
    console.log(userName, 'username');
    return userName;
  }
}
