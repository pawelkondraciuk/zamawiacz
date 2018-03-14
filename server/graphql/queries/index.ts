import { GraphQLObjectType } from 'graphql';

import userQueries from './user';
import orderQueries from './order';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root type for queries',
  fields: () => ({
    ...userQueries,
    ...orderQueries
  })
});
