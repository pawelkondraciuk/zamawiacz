import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import * as Query from '../graphql/queries/orders';

import { NewOrderInputData, Order } from './../models/order';

import { Observable } from 'rxjs/Observable';

import gql from 'graphql-tag';

import { AllOrders, OrderById } from './../graphql/queries/orders';

@Injectable()
export class OrdersService {

  private cache: Map<string, Order>;

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

  public getById(orderId: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: Query.OrderById,
      variables: {
        id: orderId,
      }
    })
    .valueChanges
    .switchMap((res) => Observable.of(res.data.order));
  }

  public getOrderDetails(orderId: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: Query.OrderDetails,
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
