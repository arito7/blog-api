import 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
import { compareSync } from 'bcryptjs';
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

const localStrategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect login details' });
    }
    if (!compareSync(password, user.hash)) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  });
});

passport.use(localStrategy);
passport.use(jwtStrategy);
