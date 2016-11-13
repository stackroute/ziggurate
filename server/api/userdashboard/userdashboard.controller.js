const schema = require('../../schema.model');
const async = require('async');

module.exports = {
  getUserInfo: function(req, res) {
    async.waterfall([
      (callback) => {
        schema.UserSchema.find({username: req.params.username}, function(err, appsname) {
          callback(null, appsname);
        });
      }, (appsname, callback) => {
        if(!appsname.length === 0) {
         schema.AppSchema.find({appname: appsname}, function(err, service) {
          let healthObject = {};
          healthObject.services = service[0].services.length;
          healthObject.apps = '1';
          res.json(healthObject);
        });
       }
       else {
        let healthObject = {};
        healthObject.services = '--';
        healthObject.apps = '--';
        res.json(healthObject);
      }
      callback(null);
    }], function() { });
  }
};
