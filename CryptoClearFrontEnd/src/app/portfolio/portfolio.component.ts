import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoServiceService } from '../crypto-service.service';
import { Transaction } from '../interfaces';
import { Coin, CoinSimple } from '../interfaces-coins';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  currentPortfolio: Transaction[] = [];
  currentPortfolioCoins: string[] = [];
  currentPortfolioCoinPrices: any;

  constructor(
    private _service: CryptoServiceService,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadCurrentPortfolio(this._userService.currentUser.id);
  }

  loadCurrentPortfolio = (userId: number): void => {
    this._service.getTransactions(userId).subscribe((data: Transaction[]) => {
      this.currentPortfolio = data;
      this.generateCoinList(this.currentPortfolio);
    });
  };

  loadSiblingPrice = (e: HTMLElement) => {
    let sibling = e.previousElementSibling;
    let currentPrice = sibling?.innerHTML;

    if (currentPrice) {
      let cPrice = parseInt(currentPrice);
      console.log(cPrice);

      e.innerText = `${cPrice}`;
    }
  };

  generateCoinList = (transactions: Transaction[]): void => {
    transactions.forEach((t) => {
      this.currentPortfolioCoins.push(t.coinId);
    });
    let query: string = this.buildQuery(this.currentPortfolioCoins);

    this.getCurrentPrices(query);
  };

  getCurrentPrices = (query: string): void => {
    this._service.getCoinPrices(query).subscribe((data: any) => {
      this.currentPortfolioCoinPrices = data;
    });
  };

  getCurrentPrice = (query: string): number => {
    return this.currentPortfolioCoinPrices[query]['usd'];
  };

  buildQuery = (coinIds: string[]): string => {
    let query = '';

    for (let i = 0; i < coinIds.length; i++) {
      query += coinIds[i] + ',';
    }

    return query;
  };
}
