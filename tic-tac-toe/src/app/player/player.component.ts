import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  player: any;
  @Input() userIndex: any;
  constructor(private userServiceService: UserServiceService) {}

  ngOnInit() {
    this.player = this.userServiceService.getUsersWithSymbol(this.userIndex);
  }

  get isMyTurn() {
    let nextSymbol = this.userServiceService.getNextSymbol();
    return this.player.symbol === nextSymbol;
  }
}
