import { Component, OnInit } from '@angular/core';
import { CryptoServiceService } from '../crypto-service.service';
import { Coin } from '../interfaces-coins';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css'],
})
export class CoinsComponent implements OnInit {
  topTwentyCoins: Coin[] = [];
  chosenCoin: Coin[] = [];
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

  loadCurrentCoin = (): void => {
    this._service.getCurrentCoin().subscribe((data: Coin[]) => {
      this.chosenCoin = data;
      console.log(data);
    });
  }
}
