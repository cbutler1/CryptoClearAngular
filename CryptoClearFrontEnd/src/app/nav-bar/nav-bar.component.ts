import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: User = {} as User;

  constructor(private _appComponent: AppComponent) {}

  ngOnInit(): void {
    this.user = this._appComponent.user;
  }
}
