import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as jwt from 'jsonwebtoken';
import * as jwtMiddleware from 'express-jwt';
import * as bodyParser from 'body-parser';

import { OAuth2Client } from 'google-auth-library';

import getConfig from './config/config';

import serverSideRenderer from './ssr';
import mongoose from './config/mongoose';
import schema from './graphql';

import UserModel from './models/user';

const app = express();
const db = mongoose();

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';
const config = getConfig(ENV);
const isDev = ENV === 'development';

if (!isDev) {
  serverSideRenderer(app);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/graphql',
  cors(),
  jwtMiddleware({
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
  graphqlHTTP(request => ({
    schema: schema,
    graphiql: isDev,
    context: request.user
  }))
);

app.route('/auth/google')
  .post((req, res, next) => {
  const client = new OAuth2Client(config.auth.google.clientID);
  const ticket = client.verifyIdToken({
    idToken: req.body.token,
    audience: config.auth.google.clientID,
  });
  ticket
    .then(({payload}) => {
      req.googlePayload = payload;
      next();
    })
    .catch((err) => { console.log(err); res.sendStatus(401); });
  })
  .post((req, res, next) => {
    if (req.googlePayload.aud !== config.auth.google.clientID) {
      res.sendStatus(401);
    } else {
      next();
    }
  })
  .post((req, res) => {
    const payload = req.googlePayload;
    UserModel.findOrCreate({ googleId: payload.sub }, { name: payload.name }, function (err, user) {
      const token = jwt.sign({id: user.id}, config.auth.token.secret, {
        expiresIn: config.auth.token.expiresIn
      });
      res.json({
        user, token
      });
    });
  });

app.listen(PORT, () => {
  console.log(`A GraphQL API running at port ${PORT}`);
});
