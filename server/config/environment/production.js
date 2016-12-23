/* eslint no-process-env: 0 */
module.exports = {
    PORT: process.env.PORT || 8080,
	GITHUB_CLIENT_ID: '674dd35f95c2ca00bbcc',
	GITHUB_CLIENT_SECRET: '80b3431e6d93d489e014e949433976b1310d1e6b',
	GITHUB_ORGANISATION: 'Ziggurate',
  MONGO_URL: 'mongodb://172.23.238.251/ziggurate',
  JWT_SECRET: process.env.JWT_SECRET || '824hdaueranteuhn',
	USER_AGENT: process.env.USER_AGENT || 'ReactBoilerplate'
};
