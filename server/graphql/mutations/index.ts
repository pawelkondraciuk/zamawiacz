import { GraphQLObjectType } from 'graphql';

import userMutations from './user';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root type for mutations',
  fields: () => ({
    ...userMutations
  })
});
