import { Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [OktaAuthGuard]},
  { path: 'login/callback', component: OktaCallbackComponent }
];

