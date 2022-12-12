import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction, User } from './interfaces';
import { defaultIfEmpty, Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  [x: string]: any;
  backEndBaseUrl: string = 'https://localhost:58557/api/';

  constructor(private httpClient: HttpClient, public auth: AuthService) {}

  getUserById = (userId: string | undefined): Observable<User> => {
    return this.httpClient.get<User>(`${this.backEndBaseUrl}Users/${userId}`);
  };

  createUser = (
    userId: string | undefined,
    userName: string | undefined
  ): Observable<User> => {
    let r: any;
    if (userId != undefined && userName != undefined) {
      let user: User = {
        id: userId,
        liquidCash: 10000,
        name: userName,
      };

      let jsonTrade = JSON.stringify(user);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.httpClient
        .post<User>(`${this.backEndBaseUrl}Users`, jsonTrade, {
          headers: headers,
        })
        .subscribe((result) => {
          r = result;
        });
    }
    return r;
  };

  updateUserCash = (user: User, newLiquidCash: number): Observable<User> => {
    let body = {
      id: user.id,
      name: user.name,
      liquidCash: newLiquidCash,
    };
    let r: any;

    let jsonBody = JSON.stringify(body);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .put<Transaction>(`${this.backEndBaseUrl}Users/${user.id}`, jsonBody, {
        headers: headers,
      })
      .subscribe((result) => {
        r = result;
      });

    return r;
  };

  checkUser = (userId: string | undefined): Observable<boolean> => {
    return this.httpClient.get<boolean>(
      `${this.backEndBaseUrl}Users/userCheck?id=${userId}`
    );
  };
}
