const mongoose = require('mongoose');
const config = require('./config');
const mongoURL = config.mongoURL;

mongoose.connect(mongoURL, function(err) {
  if(err) { console.err('Couldn\'t connect to mongodb'); process.exit(-1); }
  console.log('Connected to MongoDB');
});
