const schema = require('../../schema.model');

module.exports = {
	getUserApps: function(req, res) {
		schema.UserSchema.find({username: req.params.username}, function(err, appsname) {
			res.json(appsname);
		});
	}
};

