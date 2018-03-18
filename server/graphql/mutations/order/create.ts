import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import OrderModel from '../../../models/order';
import { OrderType, OrderInputType } from '../../types/order';

const createOrder = {
  type: OrderType,
  args: {
    order: {
      type: new GraphQLNonNull(OrderInputType),
    }
  },
  resolve: async (root, {order}, context) => {
    const oModel = new OrderModel(Object.assign({}, order, {
      user: new mongoose.Types.ObjectId(context.id)
    }));
    const newOrder = oModel.save();
    if (!newOrder) {
      throw new Error('Error');
    }
    return newOrder;
  }
};

export default createOrder;
