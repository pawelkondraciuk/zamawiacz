import { GraphQLID, GraphQLList } from 'graphql';
import * as mongoose from 'mongoose';

import OrderModel from '../../models/order';
import { OrderType } from '../types/order';

export default {
  orders: {
    type: new GraphQLList(OrderType),
    description: 'Get order list',
    resolve: () => {
      const orders = OrderModel.find().populate('user').populate('orderItems').exec();
      if (!orders) {
        throw new Error('Error');
      }
      return orders;
    }
  },
  order: {
    type: OrderType,
    description: 'Get order by ID',
    args: { id: { type: GraphQLID } },
    resolve: (root, {id}) => {
      return OrderModel.findById(new mongoose.Types.ObjectId(id));
    }
  },
};
