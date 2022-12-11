import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { UserServiceService } from '../user-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() user: User = {} as User;
  profileId: string | undefined = '';

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private _userService: UserServiceService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}
}
