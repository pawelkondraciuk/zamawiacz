import { GraphQLID, GraphQLList } from 'graphql';
import * as mongoose from 'mongoose';

import OrderItemModel from '../../models/orderItem';
import { OrderItemType } from '../types/orderItem';

export default {
  orderItem: {
    type: OrderItemType,
    description: 'Get order item by ID',
    args: { id: { type: GraphQLID } },
    resolve: (root, {id}) => {
      return OrderItemModel.findById(new mongoose.Types.ObjectId(id));
    }
  },
};
