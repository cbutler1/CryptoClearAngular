import { Injectable } from '@angular/core';
import { CoinsComponent } from './coins/coins.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root',
})
export class UtilityServiceService {
  constructor() {}

  // reloadAllUsers = () => {
  //   this._navBarComp.loadUser();
  //   this._portfolioComp.loadUser();
  //   this._coinsComp.loadUser();
  // };
}
