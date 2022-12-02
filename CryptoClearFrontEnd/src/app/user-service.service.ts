import { Injectable } from '@angular/core';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  currentUser: User;

  constructor() {
    this.currentUser = {
      id: 1,
      name: 'Brennan',
      liquidCash: 10000,
    };
  }
}
