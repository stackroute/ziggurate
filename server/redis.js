const redis = require('redis');

let client = redis.createClient(6379, '172.23.238.251');
client.subscribe('nodes');

module.exports = {
   nodes: client
};
