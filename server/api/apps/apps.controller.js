let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost/my_db';

module.exports = {
	getApps: function(req, res) {
		MongoClient.connect(url, function(err, db) {
			if(err)
			{
					res.json({state: false});
			}
			else
			{
				let collection = db.collection('userData');
				collection.find({username: req.params.userId}).toArray(function(err1, result) {
					if(err1)
					{
							res.json({state: false});
					}
					else if(result.length)
					{
						res.json(result);
					}
					else
					{
						res.json({state: false});
					}
				});
			}
			db.close();
		});
	}
};
