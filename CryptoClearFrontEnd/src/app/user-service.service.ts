import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction, User } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  backEndBaseUrl: string = 'https://localhost:58557/api/';

  constructor(private httpClient: HttpClient) {}

  getUserById = (userId: number): Observable<User> => {
    return this.httpClient.get<User>(`${this.backEndBaseUrl}Users/${userId}`);
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
}
