import { Observable } from 'rxjs/Observable';
import { OrderInputData, Order } from './../models/order';
import { AllOrders, OrderById } from './../graphql/queries/orders';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import * as Query from '../graphql/queries/orders';

import gql from 'graphql-tag';
import { Router } from '@angular/router';


@Injectable()
export class OrdersService {

  private cache: Map<string, Order>;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  public createOrder(orderData: OrderInputData) {
    return this.apollo.mutate<any>({
      mutation: Query.OrderCreate,
      variables: {
        name: orderData.name,
        deliveryCost: orderData.deliveryCost,
        paymentMethod: orderData.paymentMethod,
      }
    });
  }

  public updateOrder(orderData: Order) {
    return this.apollo.mutate<any>({
      mutation: Query.OrderUpdate,
      variables: {
        id: orderData.id,
        order: {
          name: orderData.name,
          deliveryCost: orderData.deliveryCost,
          paymentMethod: orderData.paymentMethod,
        }
      }
    })
    .do(() => this.router.navigateByUrl('/orders'));
  }

  public getById(orderId: string): any {
    return this.apollo.watchQuery<any>({
      query: Query.OrderById,
      variables: {
        id: orderId,
      }
    })
    .valueChanges
    .switchMap((res) => Observable.of(res.data.order));
  }

  public getOrders() {
    return this.apollo.watchQuery<any>({
      query: Query.AllOrders,
    })
    .valueChanges
    .switchMap((res) => Observable.of(res.data.orders))
    .do((orders) => {
      const preparedData = orders.map((order) => [order.id, order]);
      this.cache = new Map(preparedData);
    });
  }


}
