import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin } from './interfaces-coins';
import { Transaction } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CryptoServiceService {
  coinGeckoBaseUrl: string = 'https://api.coingecko.com/api/v3/coins/';
  backEndBaseUrl: string = 'https://localhost:58557/api/';
  
  constructor(private httpClient: HttpClient) {}

  getTopTwentyCoins = (): Observable<Coin[]> => {
    return this.httpClient.get<Coin[]>(
      `${this.coinGeckoBaseUrl}markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );
  };

  getTransactions = (userId: number): Observable<Transaction[]> => {
    return this.httpClient.get<Transaction[]>(
      `${this.backEndBaseUrl}Transactions/${userId}`
    );
  };
}
