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
    }
  },
  resolve(root, {id}, context) {
    return OrderModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(id),
        user: new mongoose.Types.ObjectId(context.id),
        status: 'pending'
      },
      { $set: {
        status: 'completed',
        completedAt: new Date,
      } },
      { new: true }
    )
    .catch(err => new Error(err));
  }
};

export default updateOrder;
