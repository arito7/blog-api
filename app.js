const express = require('express');
const db = require('./config/mongodb');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const cors = require('cors');
const morgan = require('morgan');
require('./config/passport');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const port = process.env.PORT || 5000;

db.on('error', () => {
  console.log('mongodb connection error');
});

const app = express();
app.use(
  cors({
    origin: process.env.CORS || 'http://localhost:3000',
  })
);
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', authRoute);
app.use('/posts', postsRoute);
app.use('/users', usersRoute);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(
    JSON.stringify({ error: { message: err.message || 'Serverside Error' } })
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
