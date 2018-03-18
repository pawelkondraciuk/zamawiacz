import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import OrderItemModel from '../../../models/orderItem';
import { OrderItemType } from '../../types/orderItem';

const removeOrderItem = {
  type: OrderItemType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, {id}, context) {
    const removedOrderItem = OrderItemModel.remove({
      id: new mongoose.Types.ObjectId(id),
      user: new mongoose.Types.ObjectId(context.id)
    }).exec();
    if (!removedOrderItem) {
      throw new Error('Error');
    }
    return removedOrderItem;
  }
};

export default removeOrderItem;
