require('should');
describe('config', function() {
	it('get Config', function() {
		const config = require('../config');
		config.GITHUB_CLIENT_ID.should.be.exactly('674dd35f95c2ca00bbcc');
		config.GITHUB_CLIENT_SECRET.should.be.exactly('80b3431e6d93d489e014e949433976b1310d1e6b');
        config.GITHUB_ORGANISATION.should.be.exactly('Ziggurate');
    });
});
