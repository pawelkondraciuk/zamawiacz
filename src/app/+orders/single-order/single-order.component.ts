import { OrderItemsService } from './../../shared/services/orderItems.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Order } from './../../shared/models/order';

import { OrderItem } from '../../shared/models/orderItem';

import { UserDataService } from './../../shared/services/user-data.service';
import { OrdersService } from './../../shared/services/orders.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css'],
})
export class SingleOrderComponent implements OnInit {

  private currentOrderId: string;

  public orderItemsTableHeaders = [ 'order', 'price', `edit` ];
  public orderItems: OrderItem[];
  public order: Order;
  public currentUserId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private userDataService: UserDataService,
    private orderItemsService: OrderItemsService,
  ) {
  }

  ngOnInit() {
    this.currentOrderId = this.activatedRoute.snapshot.params.id;
    this.currentUserId = this.userDataService.getUserId();
    this.fetchCurrentOrder();
  }

  private fetchCurrentOrder() {
    this.ordersService.getOrderDetails(this.currentOrderId)
      .subscribe((order: Order) => {
        this.order = order;
        this.orderItems = order.orderItems;
      });
  }

  removeOrderItemClickHandler(id: string) {
    this.orderItemsService.removeOrderItem(id)
      .subscribe((response) => console.log(response));
  }
}
