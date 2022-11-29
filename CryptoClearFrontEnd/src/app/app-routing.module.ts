import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  { path: 'coins', component: CoinsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: '', component: CoinsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
