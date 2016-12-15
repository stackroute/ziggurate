  const spawn = require('child_process').spawn;
const async = require('async');
const schema = require('./schema.model');

module.exports = function(RepoPath, serviceName, username, appname, done) {
  async.waterfall([
   function(callback) {
    console.log('first');
     const build = spawn('docker-compose', ['build', serviceName], { cwd: RepoPath });
     build.on('close', () => { callback(null); });
   }, (callback) => {
    console.log('second');
     const tagImage = spawn('docker', ['tag', serviceName, '172.23.238.253:5000/' +
      serviceName], {cwd: RepoPath});
     tagImage.on('close', () => { callback(null); });
   }, (callback) => {
    console.log('third');
    const pushImage = spawn('docker', ['push', '172.23.238.253:5000/' +
      serviceName], { cwd: RepoPath});
    console.log('pushed');
    pushImage.on('close', () => { callback(null); });
  }, (callback) => {
    const buildBundle = spawn('docker-compose', ['bundle'], { cwd: RepoPath});
    buildBundle.stderr.on('data', (data) => {
      let output = `${data}`;
      let fileName = output.split(' ');
      let dabFileName = fileName[fileName.length - 1];
      let extractDabFileName = '';
      for(let i = 0; i < dabFileName.length; i = i + 1) {
        if(dabFileName[i] === '.') {
          break;
        }
        else
        {
          extractDabFileName = extractDabFileName + dabFileName[i];
        }
      }
      console.log(extractDabFileName);
      callback(null, extractDabFileName);
    });
  }, (dabFileName, callback) => {
    const deploy = spawn('docker', ['stack', 'deploy', dabFileName], {cwd: RepoPath});
    deploy.on('close', () => { callback(null); });
  }, (callback) => {
    const getServiceIds = spawn('docker', ['service', 'ls', '-q'], {cwd: '.'});
    getServiceIds.stdout.on('data', function(data) {
      let serviceids = `${data}`;
      let serviceIdArray = serviceids.split('\n');
      callback(null, serviceIdArray);
    });
  }, (serviceIdArray, callback) => {
   for(let i = 0; i < serviceIdArray.length; i = i + 1) {
    spawn('docker', ['service', 'scale', serviceIdArray[i] + '=3'], {cwd: RepoPath});
  }
  callback(null, serviceIdArray);
}, (serviceIdArray, callback) => {
  let obj1 = {
    username: username,
    apps: [{appname: appname}]
  };
  const user = new schema.UserSchema(obj1);
  user.save(function() {
    callback(null, serviceIdArray);
  });
}, (serviceIdArray, callback) => {
  let services = [];
  let serviceinfo = {};
  for(let i = 0; i < serviceIdArray.length - 1; i = i + 1) {
    serviceinfo = {};
    serviceinfo.serviceId = serviceIdArray[i];
    services.push(serviceinfo);
  }
  let obj2 = {
    appname: appname,
    services: services
  };
  const app = new schema.AppSchema(obj2);
  app.save(function() {
    callback(null);
  });
}], function() { done(); });
};
