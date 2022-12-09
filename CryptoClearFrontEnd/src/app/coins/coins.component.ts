import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AppComponent } from '../app.component';
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

  constructor(
    private _service: CryptoServiceService,
    private _userService: UserServiceService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((data) => {
      this.currentUserId = data?.sub?.split('|')[1];
      this.userName = data?.name;
      this.loadUser();
    });
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

  createUser = (userId: string | undefined, userName: string | undefined) => {
    this._userService.createUser(userId, userName).subscribe((data) => {
      this.loadUser();
    });
  };

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
    await window.location.replace('http://localhost:4200/coins');
    await this.loadUser();
  }
}
