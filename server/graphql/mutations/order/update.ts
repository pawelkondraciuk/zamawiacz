import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import OrderModel from '../../../models/order';
import { OrderType, OrderInputType } from '../../types/order';

const updateOrder = {
  type: OrderType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    order: {
      type: new GraphQLNonNull(OrderInputType),
    }
  },
  resolve(root, {order, id}, context) {
    return OrderModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(id),
        user: new mongoose.Types.ObjectId(context.id),
      },
      { $set: order },
      { new: true }
    )
    .catch(err => new Error(err));
  }
};

export default updateOrder;
