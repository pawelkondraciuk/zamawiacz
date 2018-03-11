import { OAuth2Strategy } from 'passport-google-oauth';
import UserModel from '../models/user';
import getConfig from './config';

const env = process.env.NODE_ENV || 'development';
const config = getConfig(env);

export default function(passport) {
  passport.use(new OAuth2Strategy({
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: config.auth.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    UserModel.findOrCreate({ googleId: profile.id }, { name: profile.displayName }, function (err, user) {
      return done(err, user);
    });
  }));
}
