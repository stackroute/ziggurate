const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost/ziggurate';

mongoose.connect(mongoURL, function(err) {
  if(err) { console.err('Couldn\'t connect to mongodb'); process.exit(-1); }
  console.log('Connected to MongoDB');
});
