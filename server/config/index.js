/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'dev';
module.exports = require('./environment/' + env + '.js');
