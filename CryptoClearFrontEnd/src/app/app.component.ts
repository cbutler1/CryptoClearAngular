import { Component } from '@angular/core';
import { CryptoServiceService } from './crypto-service.service';
import { User } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User = {
    id: 1,
    name: 'Collin',
    liquidCash: 8932839.33,
  };
}
