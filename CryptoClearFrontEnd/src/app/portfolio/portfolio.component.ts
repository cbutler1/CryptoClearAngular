import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CryptoServiceService } from '../crypto-service.service';
import { Transaction, User } from '../interfaces';
import { UserServiceService } from '../user-service.service';
import { UtilityServiceService } from '../utility-service.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  @Input() user: User = {} as User;
  currentPortfolio: Transaction[] = [];
  currentPortfolioCoins: string[] = [];
  currentPortfolioCoinPrices: any;
  activeTransaction: Transaction = {} as Transaction;
  desiredSellAmount: number = 0;

  dataLoaded: Promise<boolean> = Promise.resolve(false);

  constructor(
    private _service: CryptoServiceService,
    private _userService: UserServiceService,
    private _appCpmponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadCurrentPortfolio(this.user.id);
  }

  loadCurrentPortfolio = (userId: number): void => {
    this._service.getTransactions(userId).subscribe((data: Transaction[]) => {
      this.currentPortfolio = data;
      this.generateCoinList(this.currentPortfolio);
      this.dataLoaded = Promise.resolve(true);
    });
  };

  loadSiblingPrice = (e: HTMLElement) => {
    let sibling = e.previousElementSibling;
    let currentPrice = sibling?.innerHTML;

    if (currentPrice) {
      let cPrice = parseInt(currentPrice);

      e.innerText = `${cPrice}`;
    }
  };

  generateCoinList = (transactions: Transaction[]): void => {
    transactions.forEach((t) => {
      this.currentPortfolioCoins.push(t.coinId);
    });
    this.currentPortfolioCoins = [...new Set(this.currentPortfolioCoins)];

    let query: string = this.buildQuery(this.currentPortfolioCoins);

    this.getCurrentPrices(query);
  };

  getCurrentPrices = (query: string): void => {
    this._service.getCoinPrices(query).subscribe((data: any) => {
      this.currentPortfolioCoinPrices = data;
      console.log(data);
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

    query = query.replace(/,\s*$/, '');

    return query;
  };

  setActiveTransaction(t: Transaction) {
    this.activeTransaction = t;
  }

  sellCoins = () => {
    let desiredSellQuantity: number =
      this.desiredSellAmount /
      this.getCurrentPrice(this.activeTransaction.coinId);

    if (this.activeTransaction.quantity == desiredSellQuantity) {
      this._service.deleteTransaction(this.activeTransaction.id);
    } else {
      this._service.updateTransaction(
        this.activeTransaction,
        this.activeTransaction.quantity - desiredSellQuantity,
        this.activeTransaction.purchasePrice -
          (this.activeTransaction.purchasePrice /
            this.activeTransaction.quantity) *
            desiredSellQuantity
      );
    }

    this._userService.updateUserCash(
      this.user,
      this.user.liquidCash + this.desiredSellAmount
    );
    this._appCpmponent.loadUser();
  };

  reloadPage() {
    window.location.reload();
  }
}
