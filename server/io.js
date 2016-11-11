const io = require('socket.io')();
// const redisCli = require('./redis.js');
// const server = require('./api/servers');
module.exports = function(http) {
   io.on('connection', function() {
      console.log('connected');
   });
   if(http) {
      io.attach(http);
   } else {
      const https = require('http').createServer();
      io.attach(https);
      https.listen(8081, function() {
         console.log('server listening on 8081');
      });
   }
}
