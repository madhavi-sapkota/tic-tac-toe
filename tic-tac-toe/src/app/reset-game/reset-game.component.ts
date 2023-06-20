import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-game',
  templateUrl: './reset-game.component.html',
  styleUrls: ['./reset-game.component.css'],
})
export class ResetGameComponent {
  constructor(private gameService: GameService, private router: Router) {}
  onClick() {
    this.gameService.resetGame();
    this.router.navigate(['/']);
  }
}
