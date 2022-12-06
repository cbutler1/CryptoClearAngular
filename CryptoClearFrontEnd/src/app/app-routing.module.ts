import { Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { User } from './interfaces';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResourcesComponent } from './resources/resources.component';
import { SelectedCoinViewComponent } from './selected-coin-view/selected-coin-view.component';

const routes: Routes = [
  { path: 'coins', component: CoinsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'coinDetails', component: SelectedCoinViewComponent},
  { path: '', component: CoinsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  @Input() user: User = {} as User;
}
