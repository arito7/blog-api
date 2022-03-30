import express from 'express';
import db from './config/mongodb.js';
import authRoute from './routes/auth.js';
import postsRoute from './routes/posts.js';
import cors from 'cors';
import morgan from 'morgan';
import './config/passport.js';
import compression from 'compression';
import helmet from 'helmet';

db.on('error', () => {
  console.log('mongodb connection error');
});

const app = express();
app.use(
  cors({
    allowedHeaders: '*',
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  })
);
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoute);
app.use('/posts', postsRoute);

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

app.listen(5000, () => {
  console.log('listening on port 5000');
});
