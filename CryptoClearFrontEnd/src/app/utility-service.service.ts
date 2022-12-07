import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root',
})
export class UtilityServiceService {
  constructor(
    private _router: Router,
    private _coinsComp: CoinsComponent,
    private _portfolioComp: PortfolioComponent,
    private _navBarComp: NavBarComponent
  ) {}

  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
  }

  reloadAllUsers = () => {
    this._navBarComp.loadUser();
    this._portfolioComp.loadUser();
  };
}
