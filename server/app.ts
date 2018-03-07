import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import serverSideRenderer from './ssr';
import mongoose from './config/mongoose';
import schema from './graphql';

const app = express();
const db = mongoose();

const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
  serverSideRenderer(app);
}

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`A GraphQL API running at port ${PORT}`);
});
