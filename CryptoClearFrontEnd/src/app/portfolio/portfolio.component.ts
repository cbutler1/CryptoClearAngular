import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoServiceService } from '../crypto-service.service';
import { Transaction } from '../interfaces';
import { Coin } from '../interfaces-coins';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
currentPortfolio: Transaction[] = [];

  constructor(private _service: CryptoServiceService) { }

  ngOnInit(): void {
    this.loadCurrentPortfolio(1)
  };

  loadCurrentPortfolio = (userId: number): void => {
    this._service.getTransactions(userId).subscribe((data: Transaction[]) => {
      this.currentPortfolio = data;
      console.log(data);
  });
}
}
