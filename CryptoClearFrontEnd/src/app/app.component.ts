import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinsComponent } from './coins/coins.component';
import { User } from './interfaces';
import { NavBarComponent } from './nav-bar/nav-bar.component';
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
  currentUserId: number = 1;
  user: User = {} as User;

  constructor(private _userService: UserServiceService) {
    this._userService.getUserById(1).subscribe((data: User) => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser = () => {
    this._userService.getUserById(1).subscribe((data: User) => {
      this.user = data;
    });
  };

  onOutletLoaded(
    component: PortfolioComponent | CoinsComponent | SelectedCoinViewComponent
  ) {
    this.loadUser();
    component.user = this.user;
  }
}
