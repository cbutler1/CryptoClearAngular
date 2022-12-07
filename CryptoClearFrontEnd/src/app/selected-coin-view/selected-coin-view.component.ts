import { Component, Input, OnInit } from '@angular/core';
import { CryptoServiceService } from '../crypto-service.service';
import { Coin } from '../interfaces-coins';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces';

@Component({
  selector: 'app-selected-coin-view',
  templateUrl: './selected-coin-view.component.html',
  styleUrls: ['./selected-coin-view.component.css'],
})
export class SelectedCoinViewComponent implements OnInit {
  @Input() user: User = {} as User;
  selectedCoinInfo: Coin = {} as Coin;
  coinName: string = '';
  constructor(
    private _service: CryptoServiceService,
    private route: ActivatedRoute
  ) {}

  // getSelectedCoinInfo = (): void => {
  //   this._service['getCoinInfo']().subscribe((data: Coin) => {
  //     this.selectedCoinInfo = data;
  //   })
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.coinName = params['coinName'];
    });
  }
}
