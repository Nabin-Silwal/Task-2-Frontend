import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HeaderComponent } from './component/header/header.component';
import { UserAddressComponent } from './component/user-address/user-address.component';
import { AddAddressComponent } from './component/add-address/add-address.component';
import { EditAddressComponent } from './component/edit-address/edit-address.component';
import { HistoricalDataChartComponent } from './component/historical-data-chart/historical-data-chart.component';
import { HomeComponent } from './component/home/home.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent },
  {
    path: 'user-address',
    component: UserAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-address',
    component: AddAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-address/:id',
    component: EditAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'historical-data-chart',
    component: HistoricalDataChartComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' }, // Redirect to home for any other invalid route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
