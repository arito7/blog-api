import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { jwtAuth } from '../config/passport.js';
import { config } from 'dotenv';
config();

const router = Router();

router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status = 400;
      res.send('Database error');
    }
    if (user) {
      res.status = 400;
      res.send('Username is taken.');
    } else {
      bcrypt.hash(req.body.password, bcrypt.genSaltSync()).then((hash) => {
        const user = new User({
          username: req.body.username,
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

router.get('/protected', jwtAuth, (req, res) => {
  res.send('successfully authenticated');
});

export default router;
