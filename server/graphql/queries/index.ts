import { GraphQLObjectType } from 'graphql';

import userQueries from './user';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root type for queries',
  fields: () => ({
    ...userQueries
  })
});
