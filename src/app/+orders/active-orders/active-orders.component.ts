import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { OrdersService } from './../../shared/services/orders.service';
import { OrderItemsService } from './../../shared/services/orderItems.service';

import { Order } from './../../shared/models/order';
import { OrderItem } from './../../shared/models/orderItem';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  public columnsHeaders = ['name', 'orderer', 'deliveryCost', 'paymentMethod', 'options'];
  public tableData: Observable<Order[]>;

  constructor(
    private ordersService: OrdersService,
    private orderItemsService: OrderItemsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  private getActiveOrders() {
    this.tableData = this.ordersService.getOrders()
      .map((orders) => {
        return orders.map((order) => {
          return {
            id: order.id,
            name: order.name,
            deliveryCost: order.deliveryCost,
            paymentMethod: order.paymentMethod,
            orderer: order.user.name,
          };
        });
      });
  }

  public removeClickHandler(id: string) {
    this.ordersService.removeOrder(id)
      .subscribe(() => this.router.navigateByUrl('/orders'));
  }

  public editClickHandler(id: string) {
    this.router.navigateByUrl(`orders/edit/${id}`);
  }

  public addOrderItem(id: string) {
    this.router.navigateByUrl(`orders/items/create/${id}`);
  }

  public rowClickHandler(id: string) {
    this.router.navigateByUrl(`orders/details/${id}`);
  }
}
