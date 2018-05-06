import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import * as Query from '../graphql/queries/orders';

import {
  NewOrderInputData,
  Order,
  OrderQuery,
  AllOrdersQuery,
} from './../models/order';

import {
  AllOrders,
  OrderById
} from './../graphql/queries/orders';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrdersService {

  private cache: Map<string, Order> = new Map();

  constructor(
    private apollo: Apollo,
  ) {}

  public createOrder(orderData: NewOrderInputData) {
    return this.apollo.mutate<any>({
      mutation: Query.OrderCreate,
      variables: {
        name: orderData.name,
        deliveryCost: orderData.deliveryCost,
        paymentMethod: orderData.paymentMethod,
      },
      refetchQueries: [{
        query: Query.AllOrders
      }]
    });
  }

  public removeOrder(orderId: string) {
    return this.apollo.mutate<any>({
      mutation: Query.OrderRemove,
      variables: {
        id: orderId,
      },
      refetchQueries: [{
        query: Query.AllOrders
      }]
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
    });
  }

  public getOrderDetails(orderId: string): Observable<Order> {
    return this.apollo.watchQuery<OrderQuery>({
      query: Query.OrderDetails,
      variables: {
        id: orderId,
      }
    })
    .valueChanges
    .switchMap((res) => Observable.of(res.data.order));
  }

  public getOrders(): Observable<Order[]> {
    return this.apollo.watchQuery<AllOrdersQuery>({
      query: Query.AllOrders,
    })
    .valueChanges
    .switchMap((res) => Observable.of(res.data.orders))
    .do((orders) => {
      orders.forEach((order) => this.cache.set(order.id, order));
    });
  }
}
