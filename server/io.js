const io = require('socket.io')();

const async = require('async');

const childProcess = require('child_process').spawn;

module.exports = function(http) {
   io.on('connection', function(socket) {
      console.log('connected1');
      socket.on('clone', function(msg) {
         console.log('Cloning');
         const repositoryName = msg.repositoryName;
         const branch = msg.branch;
         async.waterfall([
            (done) => {
               const clone = childProcess.spawn('git', ['clone', repositoryName, '-b', branch, path.join(process.env.REPOSITORY_PATH,'username') + repositoryName ]);
               clone.stdout.on('data', (data) => {
                  console.log('stdout', data);
               });
               clone.stderr.on('data', (data) => {
                  console.log('stderr', data);
               });
               clone.on('close', (exitCode) => {
                  console.log('Completed with exit code', exitCode);
                  done();
               });
            }
         ], (err, result) => {
            console.log('piniss');
         });
      });
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
