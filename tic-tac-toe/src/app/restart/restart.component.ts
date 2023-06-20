import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css'],
})
export class RestartComponent {
  constructor(private gameService: GameService) {}
  onClick() {
    this.gameService.restartGame();
  }
}
