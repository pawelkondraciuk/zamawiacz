import { OrderById } from './../graphql/queries/orders';
import {  } from './../graphql/queries/orderItems';
import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { OrderItemInputData } from './../models/orderItem';

import * as Query from '../graphql/queries/orderItems';
import * as OrderQuery from '../graphql/queries/orders';

@Injectable()
export class OrderItemsService {

  constructor(
    private apollo: Apollo,
  ) { }

  public createOrderItem(orderId: string, orderItemData: any) {
    return this.apollo.mutate<any>({
      mutation: Query.OrderItemCreate,
      variables: {
        orderId: orderId,
        orderItem: orderItemData,
      },
    });
  }

  public removeOrderItem(orderItemId: string) {
    return this.apollo.mutate<any>({
      mutation: Query.OrderItemRemove,
      variables: {
        id: orderItemId,
      },
      refetchQueries: [{
        query: OrderQuery.OrderDetails,
        variables: {
          id: '5abf8f04bd4b070a999df9da',
        }
      }
      ]
    });
  }
}
