require('should');
describe('config', function() {
	it('get Config', function() {
		const config = require('../config');
		config.GITHUB_CLIENT_ID.should.be.exactly('39f0454049473a267178');
		config.GITHUB_CLIENT_SECRET.should.be.exactly('6f81e8e96f0442b82b38fdf7ec28a416a840fa38');
    config.GITHUB_ORGANISATION.should.be.exactly('Ziggurate');
    config.MONGO_URL.should.be.exactly('mongodb://localhost/ziggurate');
    });
});
