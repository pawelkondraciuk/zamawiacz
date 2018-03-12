import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'orders'
  }, {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule',

  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'user',
    loadChildren: './+user/user.module#UserModule',
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
