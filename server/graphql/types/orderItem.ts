import { GraphQLID, GraphQLNonNull, GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import * as GraphQLDate from 'graphql-date';
import { OrderType } from './order';

const OrderItemType = new GraphQLObjectType({
  name: 'OrderItemType',
  description: 'Order item type definition',
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
    }
  })
});

const OrderItemInputType = new GraphQLInputObjectType({
  name: 'OrderItemInputType',
  description: 'Order item input type definition',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      type: GraphQLFloat
    },
  })
});

export {
  OrderItemType,
  OrderItemInputType,
};
