import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import mongoose from './config/mongoose';
import schema from './graphql';

const app = express();
const db = mongoose();
const port = process.env.PORT || 3000;

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`A GraphQL API running at port ${port}`);
});
