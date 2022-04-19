const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = (req, res) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status = 400;
      res.send('Database error');
    }
    if (user) {
      res.status = 400;
      res.json({ message: 'Username is taken.' });
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
};

exports.login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.json({ message: err.message });
    }
    if (!user) {
      res.json({ message: 'username does not exist' });
    } else {
      bcrypt.compare(req.body.password, user.hash).then((match) => {
        if (match) {
          const payload = {
            sub: user.id,
            iat: Date.now(),
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.json({ success: true, token, expiresIn: '14d' });
        } else {
          res.status(403);
          res.json({ message: 'Incorrect login credentials' });
        }
      });
    }
  });
};
