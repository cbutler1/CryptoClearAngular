import { Component } from '@angular/core';
import { CryptoServiceService } from './crypto-service.service';
import { User } from './interfaces';
import { Coin } from './interfaces-coins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User = {
    id: 1,
    name: 'Brennan',
    liquidCash: 8536.13,
  };
}
