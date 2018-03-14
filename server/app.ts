import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';

import { OAuth2Client } from 'google-auth-library';

import getConfig from './config/config';

import serverSideRenderer from './ssr';
import mongoose from './config/mongoose';
import graphql from './config/graphql';

import UserModel from './models/user';

const app = express();
const db = mongoose();

const PORT = process.env.PORT || 3000;
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

graphql(app);

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
