import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserServiceService } from '../user-service.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent implements OnInit {
  currentUserId: any;
  userName: any;
  @Input() user: User = {} as User;

  constructor(
    public auth: AuthService,
    private _userService: UserServiceService
  ) {}

  ngOnInit() {
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
}
