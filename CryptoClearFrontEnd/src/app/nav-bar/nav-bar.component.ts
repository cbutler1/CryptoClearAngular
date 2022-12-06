import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() user: User = {} as User;

  constructor() {}

  ngOnInit(): void {}
}
