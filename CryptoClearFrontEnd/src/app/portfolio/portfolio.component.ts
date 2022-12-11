//#region Imports
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AppComponent } from '../app.component';
import { CryptoServiceService } from '../crypto-service.service';
import { CombinedTransactions, Transaction, User } from '../interfaces';
import { UserServiceService } from '../user-service.service';
//#endregion

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  //#region Variables
  currentUserId: string | undefined = '';
  userName: string | undefined = '';
  @Input() user: User = {} as User;
  currentPortfolio: Transaction[] = [];
  currentPortfolioCoins: string[] = [];
  currentPortfolioCoinPrices: any;
  activeTransaction: Transaction = {} as Transaction;
  desiredSellAmount: number = 0;

  combinedTransactionPortfolio: CombinedTransactions[] = [];

  dataLoaded: Promise<boolean> = Promise.resolve(false);
  mySubscription: any;
  //#endregion

  constructor(
    private _service: CryptoServiceService,
    private _userService: UserServiceService,
    private _appCpmponent: AppComponent,
    public auth: AuthService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe((data) => {
      this.currentUserId = data?.sub?.split('|')[1];
      this.userName = data?.name;
      this.loadUser();
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  //#region Functions
  loadUser = () => {
    if (this.currentUserId != undefined) {
      this._userService
        .getUserById(this.currentUserId)
        .subscribe((data: User) => {
          if (data.id != '') {
            this.user = data;
            this.loadCurrentPortfolio(this.user.id);
          } else {
            this.createUser(this.currentUserId, this.userName);
          }
        });
    }
  };

  async createUser(userId: string | undefined, userName: string | undefined) {
    this._userService.createUser(userId, userName);
    await new Promise((f) => setTimeout(f, 1000));
    this.loadUser();
  }

  async loadCurrentPortfolio(userId: string) {
    this._service.getTransactions(userId).subscribe((data: Transaction[]) => {
      this.currentPortfolio = data;
      this.generateCoinList(this.currentPortfolio);
    });
    await new Promise((f) => setTimeout(f, 1000));
    this.filterCombinedTransactions(this.currentPortfolioCoins);
    this.dataLoaded = Promise.resolve(true);
    console.log(this.combinedTransactionPortfolio);
  }

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

  filterCombinedTransactions = (coinsArray: string[]) => {
    let cTrans: CombinedTransactions = {} as CombinedTransactions;

    coinsArray.forEach((coin) => {
      cTrans.cumlativePurchasePrice = 0;
      cTrans.cumulativeQuantity = 0;
      cTrans.coinId = coin;
      cTrans.coinTransactions = this.currentPortfolio.filter(
        (t) => t.coinId === coin
      );
      cTrans.currentCoinPrice = this.getCurrentPrice(coin);
      cTrans.coinTransactions.forEach((trans) => {
        cTrans.cumulativeQuantity += trans.quantity;
        cTrans.cumlativePurchasePrice += trans.purchasePrice;
      });
      cTrans.netCoinValue = cTrans.cumulativeQuantity * cTrans.currentCoinPrice;

      this.combinedTransactionPortfolio.push(cTrans);
      cTrans = {} as CombinedTransactions;
    });
  };

  setActiveTransaction(t: Transaction) {
    this.activeTransaction = t;
  }

  resetTransaction = () => {
    this.activeTransaction = {} as Transaction;
    this.desiredSellAmount = 0;
  };

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
    this.desiredSellAmount = 0;
    // this.loadUser();
    this.reloadPage();
  };

  async reloadPage() {
    await new Promise((f) => setTimeout(f, 500));
    // await window.location.replace('http://localhost:4200/portfolio');
    await this.loadUser();
  }
  //#endregion
}
