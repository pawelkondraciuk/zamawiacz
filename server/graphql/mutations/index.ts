import { GraphQLObjectType } from 'graphql';

import userMutations from './user';
import orderMutations from './order';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root type for mutations',
  fields: () => ({
    ...userMutations,
    ...orderMutations,
  })
});
