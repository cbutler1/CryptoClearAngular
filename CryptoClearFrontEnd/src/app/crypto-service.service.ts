import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin, CoinSimple } from './interfaces-coins';
import { Transaction, User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CryptoServiceService {
  [x: string]: any;
  coinGeckoBaseUrl: string = 'https://api.coingecko.com/api/v3/';
  backEndBaseUrl: string = 'https://localhost:58557/api/';

  constructor(private httpClient: HttpClient) {}

  getTopTwentyCoins = (): Observable<Coin[]> => {
    return this.httpClient.get<Coin[]>(
      `${this.coinGeckoBaseUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );
  };

  getTransactions = (userId: string): Observable<Transaction[]> => {
    return this.httpClient.get<Transaction[]>(
      `${this.backEndBaseUrl}Transactions/${userId}`
    );
  };

  getCoinPrices = (query: string): Observable<CoinSimple> => {
    return this.httpClient.get<CoinSimple>(
      `${this.coinGeckoBaseUrl}simple/price?ids=${query}&vs_currencies=usd`
    );
  };

  addTransaction = (trade: Transaction): Observable<Transaction> => {
    let r: any;
    let jsonTrade = JSON.stringify(trade);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<Transaction>(`${this.backEndBaseUrl}Transactions`, jsonTrade, {
        headers: headers,
      })
      .subscribe((result) => {
        r = result;
      });
    return r;
  };

  deleteTransaction = (id: number): Observable<Transaction> => {
    let r: any;

    this.httpClient
      .delete<Transaction>(`${this.backEndBaseUrl}Transactions/${id}`)
      .subscribe((result) => {
        r = result;
      });
    return r;
  };

  updateTransaction = (
    t: Transaction,
    newQuantity: number,
    newPurchasePrice: number
  ): Observable<Transaction> => {
    let updatedTransaction: any = {
      id: t.id,
      userId: t.userId,
      coinId: t.coinId,
      quantity: newQuantity,
      purchasePrice: newPurchasePrice,
    };
    let r: any;

    let jsonTrade = JSON.stringify(updatedTransaction);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .put<Transaction>(
        `${this.backEndBaseUrl}Transactions/${updatedTransaction.id}`,
        jsonTrade,
        {
          headers: headers,
        }
      )
      .subscribe((result) => {
        r = result;
      });

    return r;
  };
}
