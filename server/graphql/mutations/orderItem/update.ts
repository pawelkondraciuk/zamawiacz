import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import OrderItemModel from '../../../models/orderItem';
import { OrderItemType, OrderItemInputType } from '../../types/orderItem';

const updateOrderItem = {
  type: OrderItemType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    orderItem: {
      type: new GraphQLNonNull(OrderItemInputType),
    }
  },
  resolve(root, {orderItem, id}, context) {
    return OrderItemModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(id),
        user: new mongoose.Types.ObjectId(context.id),
      },
      { $set: orderItem },
      { new: true }
    )
    .catch(err => new Error(err));
  }
};

export default updateOrderItem;
