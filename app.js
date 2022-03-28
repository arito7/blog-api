import express from 'express';
import db from './config/mongodb.js';
import authRoute from './routes/auth.js';
import './config/passport.js';

db.on('error', () => {
  console.log('mongodb connection error');
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoute);
app.get('/', (req, res) => {
  res.send('test');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
