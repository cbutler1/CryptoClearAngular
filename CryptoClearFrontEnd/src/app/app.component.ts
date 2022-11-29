import { Component } from '@angular/core';
import { CryptoServiceService } from './crypto-service.service';
import { Coin } from './interfaces-coins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // title = 'CryptoClearFrontEnd';

  topTwentyCoins: Coin[] = [];

  constructor(private _service: CryptoServiceService) {}

  ngOnInit(): void {
    this.loadTopTwentyCoins();
  }

  loadTopTwentyCoins = (): void => {
    this._service.getTopTwentyCoins().subscribe((data: Coin[]) => {
      this.topTwentyCoins = data;
      console.log(data);
    });
  };
}
