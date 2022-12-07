import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../interfaces';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: User = {} as User;

  constructor(
    private _appComponent: AppComponent,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser = () => {
    this._userService.getUserById(1).subscribe((data: User) => {
      this.user = data;
    });
  };
}
