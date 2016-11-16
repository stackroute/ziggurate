/* eslint no-process-env: 0 */
module.exports = {
    PORT: process.env.PORT || 8080,
  GITHUB_CLIENT_ID: '39f0454049473a267178',
  GITHUB_CLIENT_SECRET: '6f81e8e96f0442b82b38fdf7ec28a416a840fa38',
  GITHUB_ORGANISATION: 'Ziggurate',
  MONGO_URL: 'mongodb://localhost/ziggurate',
    JWT_SECRET: process.env.JWT_SECRET || '824hdaueranteuhn',
  USER_AGENT: process.env.USER_AGENT || 'ReactBoilerplate'
};
