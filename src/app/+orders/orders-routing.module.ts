import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateOrderComponent } from './create-order/create-order.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { SingleOrderComponent } from './single-order/single-order.component';

import { CreateOrderItemComponent } from './create-order-item/create-order-item.component';

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
  }, {
    path: 'edit/:id',
    component: EditOrderComponent,
  }, {
    path: 'items/create/:id',
    component: CreateOrderItemComponent,
  }, {
    path: 'details/:id',
    component: SingleOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
