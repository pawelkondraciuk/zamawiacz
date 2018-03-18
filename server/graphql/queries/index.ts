import { GraphQLObjectType } from 'graphql';

import userQueries from './user';
import orderQueries from './order';
import orderItemQueries from './orderItem';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root type for queries',
  fields: () => ({
    ...userQueries,
    ...orderQueries,
    ...orderItemQueries,
  })
});
