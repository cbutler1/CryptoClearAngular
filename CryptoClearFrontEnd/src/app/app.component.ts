import { Component, Injectable, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { CoinsComponent } from './coins/coins.component';
import { User } from './interfaces';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SelectedCoinViewComponent } from './selected-coin-view/selected-coin-view.component';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  currentUserId: string | undefined = '';
  userName: string | undefined = '';
  @Output() user: User = {} as User;

  constructor(
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

  //#region Functions
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

  createUser = (userId: string | undefined, userName: string | undefined) => {
    this._userService.createUser(userId, userName);
  };

  onOutletLoaded(
    component: PortfolioComponent | CoinsComponent | SelectedCoinViewComponent
  ) {
    component.user = this.user;
  }
}
