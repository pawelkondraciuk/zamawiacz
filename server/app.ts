import * as cors from 'cors';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as jwt from 'jsonwebtoken';

import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';

import getConfig from './config/config';

import serverSideRenderer from './ssr';
import mongoose from './config/mongoose';
import schema from './graphql';
import jwtStrategy from './config/jwt';
import googleStrategy from './config/google';

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

jwtStrategy(passport);
googleStrategy(passport);

app.use(passport.initialize());
app.use('/graphql',
  cors(),
  passport.authenticate('jwt', { session: false }),
  graphqlHTTP({
    schema: schema,
    graphiql: isDev
  })
);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function(req, res) {
      const payload = {
        id: req.user.id
      };
      const token = jwt.sign(payload, config.auth.token.secret, {
        expiresIn: config.auth.token.expiresIn
      });

      res.send(`
        <script>
          localStorage.setItem('currentUser', JSON.stringify({token: '${token}'}));
          if (window.opener) {
            window.opener.location.href = '/';
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
      `);
  });

app.listen(PORT, () => {
  console.log(`A GraphQL API running at port ${PORT}`);
});
