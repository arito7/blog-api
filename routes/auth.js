import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const router = Router();
// passport.authenticate('local'),

router.post('/register', (req, res) => {
  console.log('received post login request');
  User.exists({ username: req.body.username }, (err, exists) => {
    if (err) {
      res.status = 400;
      res.send('Database error');
    }
    if (exists) {
      res.status = 400;
      res.send('Username is taken.');
    } else {
      bcrypt.hash(req.body.password, bcrypt.genSaltSync()).then((hash) => {
        const user = new User({
          username: 'test',
          hash,
        });
        user.save((err, user) => {
          if (err) {
            res.send(err);
          }
          const _id = user.id;
          const expiresIn = '14d';
          const payload = {
            sub: _id,
            iat: Date.now(),
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.json({ success: true, token, expiresIn });
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (!user) {
      res.send('username does not exist');
    }
    console.log('found user: ', user);
    bcrypt.compare(req.body.password, user.hash).then((match) => {
      if (match) {
        const payload = {
          sub: user.id,
          iat: Date.now(),
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ success: true, token, expiresIn: '14d' });
      }
    });
  });
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('successfully authenticated');
  }
);

export default router;
