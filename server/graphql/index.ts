import { GraphQLSchema } from 'graphql';

import mutationType from './mutations';
import queryType from './queries';

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema;
