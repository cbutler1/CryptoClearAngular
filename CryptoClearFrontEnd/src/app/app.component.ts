import { Component } from '@angular/core';
import { User } from './interfaces';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUserId: number = 1;
  user: User = {} as User;

  constructor(private _userService: UserServiceService) {
    this._userService.getUserById(1).subscribe((data: User) => {
      this.user = data;
    });
  }
}
