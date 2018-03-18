import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import * as GraphQLDate from 'graphql-date';
import { UserType } from './user';
import { OrderItemType } from './orderItem';

const OrderType = new GraphQLObjectType({
  name: 'OrderType',
  description: 'Order type definition',
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
    modifiedAt: {
      type: GraphQLDate
    },
    completedAt: {
      type: GraphQLDate
    },
    deliveryCost: {
      type: GraphQLFloat
    },
    paymentMethod: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
    },
    orderItems: {
      type: new GraphQLList(OrderItemType),
    }
  })
});

const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInputType',
  description: 'Order input type definition',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    deliveryCost: {
      type: GraphQLFloat
    },
    paymentMethod: {
      type: GraphQLString,
    },
  })
});

export {
  OrderType,
  OrderInputType,
};
