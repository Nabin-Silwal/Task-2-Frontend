import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CryptoBalanceChartComponent } from './component/crypto-balance-chart/crypto-balance-chart.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserAddressComponent } from './component/user-address/user-address.component';
import { FormsModule } from '@angular/forms';
import { AddAddressComponent } from './component/add-address/add-address.component';
import { EditAddressComponent } from './component/edit-address/edit-address.component';
import { HistoricalDataChartComponent } from './component/historical-data-chart/historical-data-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    CryptoBalanceChartComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserAddressComponent,
    AddAddressComponent,
    EditAddressComponent,
    HistoricalDataChartComponent,
    HomeComponent,
    UserProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgbModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
