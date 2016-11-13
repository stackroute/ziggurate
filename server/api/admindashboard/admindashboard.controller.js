const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

function serviceCount(callback, nodes, containers) {
  docker.listServices(function(err, data) {
    let services = data.length;
    callback(nodes, containers, services);
  });
}

function containerCount(callback, nodes) {
  docker.listTasks(function(err, data) {
    let containers = {};
    containers.healthyContainers = 0;
    containers.unhealthyContainers = 0;
    for(let i = 0; i < data.length; i = i + 1) {
      if(data[i].DesiredState === 'running') {
        containers.healthyContainers = containers.healthyContainers + 1;
      }
      else
      {
        containers.unhealthyContainers = containers.unhealthyContainers + 1;
      }
    }
    serviceCount(callback, nodes, containers);
    return;
  });
}

function nodeCount(callback) {
  docker.listNodes(function(err, data) {
    let nodes = {};

    nodes.healthyNodes = 0;
    nodes.unhealthyNodes = 0;

    for(let i = 0; i < data.length; i = i + 1) {
      if(data[i].Status.State === 'ready') {
        nodes.healthyNodes = nodes.healthyNodes + 1;
      }
      else {
        nodes.unhealthyNodes = nodes.unhealthyNodes + 1;
      }
    }
    containerCount(callback, nodes);
    return;
  });
}

module.exports = {
  socketData: function(socket) {
    nodeCount(function(nodes, containers, services) {
      let healthObject = {};
      healthObject.healthyNodes = nodes.healthyNodes;
      healthObject.unhealthyNodes = nodes.unhealthyNodes;
      healthObject.healthyContainers = containers.healthyContainers;
      healthObject.unhealthyContainers = containers.unhealthyContainers;
      healthObject.services = services;
      socket.emit('admindash', healthObject);
    });
  },
  admin: function(req, res) {
    nodeCount(function(nodes, containers, services) {
      let healthObject = {};
      healthObject.healthyNodes = nodes.healthyNodes;
      healthObject.unhealthyNodes = nodes.unhealthyNodes;
      healthObject.healthyContainers = containers.healthyContainers;
      healthObject.unhealthyContainers = containers.unhealthyContainers;
      healthObject.services = services;
      res.json(healthObject);
    });
  }
};
