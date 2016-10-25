var mongoose = require('mongoose');

const mongo_URL= process.env.MONGO_URL || 'mongodb://localhost/ziggurate';

mongoose.Promise = global.Promise;
mongoose.connect(mongo_URL, function(err) {

	console.log("yeppp");
  if(err) {

  	console.log("hell");
   process.exit(-1); }
  console.log('Connected to MongoDB');
});