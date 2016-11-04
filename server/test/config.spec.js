require('should');
describe('config', function() {
	it('get Config', function() {
		const config = require('../config');
		config.GITHUB_CLIENT_ID.should.be.exactly('GITHUB_CLIENT_ID');
		config.GITHUB_CLIENT_SECRET.should.be.exactly('GITHUB_CLIENT_SECRET');
		config.GITHUB_ORGANISATION.should.be.exactly('GITHUB_ORGANISATION');
		config.CONSUL_MASTER.should.be.exactly('CONSUL_MASTER');
    });
});
