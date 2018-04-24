import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';

import { CreateOrderComponent } from './create-order/create-order.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { SingleOrderComponent } from './single-order/single-order.component';

import { CreateOrderItemComponent } from './create-order-item/create-order-item.component';

import { OrdersService } from '../shared/services/orders.service';
import { OrderItemsService } from '../shared/services/orderItems.service';

@NgModule({
  imports: [
    OrdersRoutingModule,
    SharedModule,
  ],
  declarations: [
    ActiveOrdersComponent,
    CreateOrderComponent,
    EditOrderComponent,
    CreateOrderItemComponent,
    SingleOrderComponent,
  ],
  providers: [
    OrdersService,
    OrderItemsService,
  ]
})
export class OrdersModule { }
