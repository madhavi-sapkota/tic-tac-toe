import { Component, Input } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() cellValue: string | undefined;

  constructor(private userServiceService: UserServiceService) {}

  onCellClicked() {
    this.userServiceService.setNextSymbol();
  }
}
