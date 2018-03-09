import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';

import serverSideRenderer from './ssr';
import mongoose from './config/mongoose';
import schema from './graphql';

const app = express();
const db = mongoose();

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';
const isDev = ENV === 'development';

if (!isDev) {
  serverSideRenderer(app);
}

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: isDev
}));

app.listen(PORT, () => {
  console.log(`A GraphQL API running at port ${PORT}`);
});
