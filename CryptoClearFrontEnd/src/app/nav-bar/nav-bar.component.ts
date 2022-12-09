import { Component, Injectable, Input, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { UserServiceService } from '../user-service.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() user: User = {} as User;
  profileId: string | undefined = '';

  constructor(
    private _userService: UserServiceService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((data) => {
      this.profileId = data?.sub?.split('|')[1];
      console.log(this.profileId);
    });
    // this.loadUser();
  }

  loadUser = () => {
    // this._userService.getUserById(1).subscribe((data: User) => {
    //   this.user = data;
    // });
  };
}
