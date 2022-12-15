import { Component, Inject, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CryptoServiceService } from '../crypto-service.service';
import { Transaction, User } from '../interfaces';
import { Coin } from '../interfaces-coins';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css'],
})
export class CoinsComponent implements OnInit {
  currentUserId: string | undefined = '';
  userName: string | undefined = '';
  @Input() user: User = {} as User;
  topTwentyCoins: Coin[] = [];
  activeCoin: Coin = {} as Coin;
  desiredCoinAmount: number = 0.0;
  mySubscription: any;
  searchQuery: string = '';

  constructor(
    private _service: CryptoServiceService,
    private _userService: UserServiceService,
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

  loadUser = () => {
    if (this.currentUserId != undefined) {
      this._userService
        .checkUser(this.currentUserId)
        .subscribe((data: Boolean) => {
          if (data) {
            this._userService
              .getUserById(this.currentUserId)
              .subscribe((data: User) => {
                this.user = data;
                this.loadTopTwentyCoins();
              });
          } else {
            this.createUser(this.currentUserId, this.userName);
          }
        });
    } else {
      this.loadTopTwentyCoins();
    }
  };

  async createUser(userId: string | undefined, userName: string | undefined) {
    this._userService.createUser(userId, userName);
    await new Promise((f) => setTimeout(f, 1000));
    this.loadUser();
  }

  loadTopTwentyCoins = (): void => {
    this._service.getTopTwentyCoins().subscribe((data: Coin[]) => {
      this.topTwentyCoins = data;
    });
  };

  setActiveCoin(c: Coin) {
    this.activeCoin = c;
    console.log(this.user);

    console.log(c);
  }

  resetCoin = () => {
    this.activeCoin = {} as Coin;
    this.desiredCoinAmount = 0;
  };

  submitTradeToDatabase = () => {
    let trade: Transaction = {
      id: 0,
      userId: this.user.id,
      transactionDate: new Date(Date.now()),
      coinId: this.activeCoin.id,
      quantity: this.desiredCoinAmount / this.activeCoin.current_price,
      purchasePrice: this.desiredCoinAmount,
    };
    this._service.addTransaction(trade);
    this.subtractLiquidCash();
    this.desiredCoinAmount = 0;
    console.log(this.desiredCoinAmount);
  };

  subtractLiquidCash = () => {
    this._userService.updateUserCash(
      this.user,
      this.user.liquidCash - this.desiredCoinAmount
    );
    this.resetCoin();
    this.reloadPage();
  };

  async reloadPage() {
    await new Promise((f) => setTimeout(f, 500));
    // await window.location.replace('http://localhost:4200/coins');
    await this.loadUser();
  }
}
