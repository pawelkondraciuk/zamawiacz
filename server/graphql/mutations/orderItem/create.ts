import { GraphQLNonNull, GraphQLString } from 'graphql';
import * as mongoose from 'mongoose';

import OrderModel from '../../../models/order';
import OrderItemModel from '../../../models/orderItem';
import { OrderItemType, OrderItemInputType } from '../../types/orderItem';

const createOrderItem = {
  type: OrderItemType,
  args: {
    order: {
      type: new GraphQLNonNull(GraphQLString),
    },
    orderItem: {
      type: new GraphQLNonNull(OrderItemInputType),
    }
  },
  resolve: async (root, {order, orderItem}, context) => {
    const oModel = new OrderItemModel(Object.assign({}, orderItem, {
      user: new mongoose.Types.ObjectId(context.id)
    }));
    const newOrder = await oModel.save();
    if (!newOrder) {
      throw new Error('Error');
    }
    await OrderModel.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(order),
      },
      { $push: { orderItems: newOrder.id } },
      { new: true }
    )
    .catch(err => new Error(err));
    return newOrder;
  }
};

export default createOrderItem;
