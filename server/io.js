const io = require('socket.io')();
const servers = require('./api/servers/servers.controller');
const admindash = require('./api/admindashboard/admindashboard.controller');
const deploy = require('./deploy');

const redis = require('./redis');
const async = require('async');
const fs = require('fs');
const yaml = require('yamljs');
const spawn = require('child_process').spawn;
const path = require('path');

function prepareDirectory (repoName, branchName, userName, callback) {
  const pathToCreate = path.join('/tmp/repos/', repoName);
  const rmdir = spawn('rm', ['-rf', pathToCreate], {cwd: '.'});
  rmdir.on('close', function() {
    const mkdir = spawn('mkdir', ['-p', pathToCreate], {cwd: '.'});
    mkdir.on('close', function(exitCode) {
      if(exitCode === 0) {
       let repopath = path.join(pathToCreate, branchName);
       callback(null, repopath); }
     });
  });
}

function cloneRepo (repoName, branchName, repopath, callback) {
  const clonerepo = spawn('git', ['clone', 'https://github.com/' + repoName,
   '-b', branchName, repopath], {cwd: '.'});
  clonerepo.on('close', function() {
    callback(null);
  });
}

function readDockerCompose(filepath) {
  let obj = yaml.parse(fs.readFileSync(filepath, {encoding: 'utf-8'}));
  return obj;
}

/* function writeNewDockerCompose(filepath,json) {
  fs.writeFileSync(filepath, yaml.stringify(json));
}*/

function clone(repoName, branchName, userName, socket, done) {
  let repopath;

  async.series([
    (callback) => {
      prepareDirectory(repoName, branchName, userName, (err, path1) => {
        repopath = path1;
        callback(err);
      });
    }, (callback) => {
     cloneRepo(repoName, branchName, repopath, callback);
   }, (callback) => {
    let services = readDockerCompose(path.join(repopath, 'docker-compose.yml'));
    callback(null, {services: services, repopath: repopath});
  }
  ], function(err, results) {
    let result = results.pop();
    socket.emit('services', result.services);
    done(err, result.repopath);
  });
}

module.exports = function(http) {
 let repopath;
 io.on('connection', function(socket) {
  socket.on('clone', (data) => {
   clone(data.repoName, data.branchName, data.userName, socket, function(err, repo) {
    repopath = repo;
  });
 });
  socket.on('deploy', function(data) {
   deploy(repopath, Object.keys(data.services).shift(), data.meta.username,
    data.meta.appName, function() {
    socket.emit('complete', 'hey');
   });
 });
  redis.nodes.on('message', function() {
    servers.socketData(socket);
    admindash.socketData(socket);
  });
  console.log('connected');
});
 if(http) {
  io.attach(http);
} else {
  const https = require('http').createServer();
  io.attach(https);
  https.listen(8080, function() {
   console.log('IO server listening on 8080');
 });
}
};
