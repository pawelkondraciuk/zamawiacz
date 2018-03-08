import { Strategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/user';
import getConfig from './config';

const env = process.env.NODE_ENV || 'development';
const config = getConfig(env);

export default function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.token.secret
  };

  passport.use(new Strategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    UserModel.findOne({
      id: jwt_payload.id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
}
