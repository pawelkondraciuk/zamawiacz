import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrderComponent } from './create-order/create-order.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'active-orders',
  }, {
    path: 'active-orders',
    component: ActiveOrdersComponent,
  }, {
    path: 'create',
    component: CreateOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
