import * as cors from 'cors';
import * as graphqlHTTP from 'express-graphql';
import * as jwt from 'express-jwt';
import * as mongoose from 'mongoose';

import UserModel from '../models/user';
import schema from '../graphql';
import getConfig from './config';

const ENV = process.env.NODE_ENV || 'development';
const isDev = ENV === 'development';
const config = getConfig(ENV);

export default (app) => {
  app.use('/graphql',
    cors(),
    jwt({
      secret: config.auth.token.secret,
      getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
    }),
    (req, res, next) => {
      UserModel
        .find({
          _id: req.user.id
        })
        .limit(1)
        .then((user) => {
          if (!user) {
            res.sendStatus(401);
          } else {
            next();
          }
        });
    },
    graphqlHTTP(request => ({
      schema: schema,
      graphiql: isDev,
      context: request.user
    }))
  );
};
