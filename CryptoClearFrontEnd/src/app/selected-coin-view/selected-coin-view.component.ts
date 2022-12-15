import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '../interfaces-coins';
import { User } from '../interfaces';
import { AuthService } from '@auth0/auth0-angular';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute } from '@angular/router';
import { CryptoServiceService } from '../crypto-service.service';


@Component({
  selector: 'app-selected-coin-view',
  templateUrl: './selected-coin-view.component.html',
  styleUrls: ['./selected-coin-view.component.css'],

})
export class SelectedCoinViewComponent implements OnInit {
  @Input() user: User = {} as User;
  selectedCoinInfo: Coin[] = [];
  coinName: string = '';
  currentUserId: any;
  userName: any;

  constructor(
    public auth: AuthService,
    private _userService: UserServiceService,
    private _service: CryptoServiceService,
    private route: ActivatedRoute,
    // public chart: Chart
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.coinName = params['coinName'];
      this.loadSelectedCoin();
    });
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
              });
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

  loadSelectedCoin = (): void => {
    this._service.getCoinDetails(this.coinName).subscribe((data: Coin[]) => {
      console.log(data);
      this.selectedCoinInfo = data;
      console.log(this.selectedCoinInfo);
      
    });
  };
}

