import { GraphQLNonNull, GraphQLString } from 'graphql';

import OrderModel from '../../../models/order';
import { OrderType } from '../../types/order';

const removeOrder = {
  type: OrderType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, context) {
    const removedOrder = OrderModel.remove({
      _id: params.id,
      user: context.id
    }).exec();
    if (!removedOrder) {
      throw new Error('Error');
    }
    return removedOrder;
  }
};

export default removeOrder;
