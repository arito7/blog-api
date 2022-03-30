import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const dburi = process.env.MONGODB_URI;

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });

export default mongoose.connection;
