import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';

import { CreateOrderComponent } from './create-order/create-order.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
  ],
  declarations: [
    ActiveOrdersComponent,
    CreateOrderComponent
  ]
})
export class OrdersModule { }
