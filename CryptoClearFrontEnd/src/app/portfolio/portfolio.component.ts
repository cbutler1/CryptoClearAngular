import { Component, OnInit } from '@angular/core';
import { CryptoServiceService } from '../crypto-service.service';
import { Coin } from '../interfaces-coins';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
currentPortfolio: Coin[] = [];

  constructor(private _service: CryptoServiceService) { }

  ngOnInit(): void {
  }

  loadCurrentPortfolio = (): void => {
    
  }
}
