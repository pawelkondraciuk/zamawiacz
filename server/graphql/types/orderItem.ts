import { GraphQLID, GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import * as GraphQLDate from 'graphql-date';
import { OrderType } from './order';

const OrderItemType = new GraphQLObjectType({
  name: 'OrderItemType',
  description: 'User type definition',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLDate
    },
    price: {
      type: GraphQLFloat
    },
    order: {
      type: OrderType,
    }
  })
});

export {
  OrderItemType,
};
