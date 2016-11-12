const io = require('socket.io')();

const async = require('async');

const childProcess = require('child_process').spawn;

module.exports = function(http) {
   io.on('connection', function(socket) {
      socket.on('nodes', function(msg) {
         console.log(msg);
      })
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
