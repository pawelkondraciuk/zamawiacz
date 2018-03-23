import { Observable } from 'rxjs/Observable';
import { OrderInputData, Order } from './../models/order';
import { AllOrders } from './../graphql/queries/orders';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import * as Query from '../graphql/queries/orders';

import gql from 'graphql-tag';


@Injectable()
export class OrdersService {

  private cache: Map<string, Order>;

  constructor(private apollo: Apollo) {}

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
        name: orderData.name,
        deliveryCost: orderData.deliveryCost,
        paymentMethod: orderData.paymentMethod,
      }
    });
  }

  public getById(id: string): Observable<Order> {
    if (this.cache.has(id)) {
      return Observable.of(this.cache.get(id));
    } else {
      // get order by id
    }
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
