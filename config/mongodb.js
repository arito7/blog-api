const mongoose = require('mongoose');
require('dotenv').config();

const dburi = process.env.MONGODB_URI;

mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;
