import { Component, Input, OnInit } from '@angular/core';
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
  @Input() user: User = {} as User;
  topTwentyCoins: Coin[] = [];
  activeCoin: Coin = {} as Coin;
  desiredCoinAmount: number = 0.0;
  constructor(
    private _service: CryptoServiceService,
    private _appComponent: AppComponent,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadTopTwentyCoins();
  };

  loadUser = () => {
    this._userService.getUserById(1).subscribe((data: User) => {
      this.user = data;
    });
  };

  loadTopTwentyCoins = (): void => {
    this._service.getTopTwentyCoins().subscribe((data: Coin[]) => {
      this.topTwentyCoins = data;
    });
  };

  setActiveCoin(c: Coin) {
    this.activeCoin = c;
  }

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
    this._userService
      .updateUserCash(this.user, this.user.liquidCash - this.desiredCoinAmount)
      .subscribe((x) => console.log(x));

  }
}
