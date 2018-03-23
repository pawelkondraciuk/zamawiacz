import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { OrdersService } from './../../shared/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.css']
})
export class ActiveOrdersComponent implements OnInit {
  public columnsHeaders = ['title', 'orderer', 'options'];
  public tableData: Observable<any>;

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  private getActiveOrders() {
    this.ordersService.getOrders()
      .subscribe((orders) => {
        const data = orders.map((order) => {
          return {
            id: order.id,
            title: order.name,
            orderer: order.user.name,
          };
        });
        this.tableData = Observable.of(data);
      });
  }

  public editClickHandler(id: string) {
    this.router.navigateByUrl(`orders/edit/${id}`);
  }

}
