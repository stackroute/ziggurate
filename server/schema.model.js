const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {type: String, required: true, index: true, unique: true},
  apps: [
  {appname: {type: String, require: true, unique: true}}]
});

const Apps = new mongoose.Schema({
 appname: {type: String, required: true, unique: true},
 services: [{
  serviceId: {type: String, required: true}
}]
});


module.exports = {
  UserSchema: mongoose.model('user', User),
  AppSchema: mongoose.model('apps', Apps)
};
