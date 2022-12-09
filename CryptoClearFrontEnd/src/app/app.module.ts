import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CoinsComponent } from './coins/coins.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ResourcesComponent } from './resources/resources.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    PortfolioComponent,
    ResourcesComponent,
    NavBarComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-c4tlyofk5s2wmu5t.us.auth0.com',
      clientId: '0tNrScEpTC98uv5V2cYSvOsMmKt8edat',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
