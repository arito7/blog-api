import 'dotenv';
import passport from 'passport';
import User from '../models/User.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtStrategyOptions, (payload, done) => {
  User.findOne({ id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.use(jwtStrategy);
passport.initialize();

export const jwtAuth = passport.authenticate('jwt', { session: false });
