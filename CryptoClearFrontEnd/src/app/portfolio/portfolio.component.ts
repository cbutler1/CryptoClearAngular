import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoServiceService } from '../crypto-service.service';
import { Transaction } from '../interfaces';
import { Coin, CoinSimple } from '../interfaces-coins';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  currentPortfolio: Transaction[] = [];

  constructor(private _service: CryptoServiceService) {}

  ngOnInit(): void {
    this.loadCurrentPortfolio(1);
  }

  loadCurrentPortfolio = (userId: number): void => {
    this._service.getTransactions(userId).subscribe((data: Transaction[]) => {
      this.currentPortfolio = data;
      console.log(data);
    });
  };

  loadSiblingPrice = (e: HTMLElement) => {
    let sibling = e.previousElementSibling;
    let currentPrice = sibling?.innerHTML;
    console.log(currentPrice);

    if (currentPrice) {
      let cPrice = parseInt(currentPrice);
      console.log(cPrice);

      e.innerText = `${cPrice}`;
    }
  };

  getCurrentPrice = (coinId: string): any => {
    this._service.getSingleCoinPrice(coinId).subscribe((data: CoinSimple) => {
      return data.coin.price;
    });
  };
}
