const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

// This function will create the drop down list for the nodes page
function createSelection(data) {
  let dock = [];
  for(let i = 0; i < data.length; i = i + 1) {
    if(!dock.includes(data[i].Spec.Role)) {
      dock.push(data[i].Spec.Role);
    }

    if(Object.keys(data[i]).includes('ManagerStatus'))
    {
      if(Object.keys(data[i].ManagerStatus).includes('Leader') && !dock.includes('Swarm-Leader'))
      {
       dock.push('Swarm-Leader');
     }
   }
 }

 for(let i = 0; i < dock.length; i = i + 1) {
  dock[i] = dock[i].replace('worker', 'Swarm-Worker');
  dock[i] = dock[i].replace('manager', 'Swarm-Manager');
}
return dock;
}

function calculateTime(data) {
  let date = new Date(data);
  let today = new Date();
  if(today.getYear() - date.getYear() > 0) {
    return(
      today.getYear() - date.getYear() + ' years ago');
  }
  else if(today.getMonth() - date.getMonth() > 0) {
    return(
      today.getMonth() - date.getMonth() + ' months ago');
  }
  else if(today.getDate() - date.getDate() > 0)
  {
    if(today.getDate() - date.getDate() === 1)
    {
      return(
        'yesterday');
    }
    return(
      today.getDate() - date.getDate() + ' days ago');
  }
  if(today.getHours() - date.getHours() === 1 && today.getMinutes() - date.getMinutes() > 0) {
    return(
      today.getHours() - date.getHours() + ' hours ago');
  }

  else if(today.getHours() - date.getHours() > 1) {
    return(
      today.getHours() - date.getHours() + ' hours ago');
  }
  if(today.getMinutes() - date.getMinutes() < 0) {
    return(
      today.getMinutes() - date.getMinutes() + 60 + ' minutes ago');
  }
  return(
    today.getMinutes() - date.getMinutes() + ' minutes ago');
}


function allselection(data) {
  if(Object.keys(data).includes('ManagerStatus')) {
    if(Object.keys(data.ManagerStatus).includes('Leader')) {
      return 'Swarm Leader';
    }
    return 'Swarm Manager';
  }
  return 'Swarm Worker';
}

function leaderselection(data) {
 if(Object.keys(data).includes('ManagerStatus')) {
  if(Object.keys(data.ManagerStatus).includes('Leader')) {
    return 'Swarm Leader';
  }
}
return null;
}

function managerselection(data) {
  if(Object.keys(data).includes('ManagerStatus')) {
    if(!Object.keys(data.ManagerStatus).includes('Leader')) {
      return 'Swarm Manager';
    }
    return null;
  }
  return null;
}
// this function will return a json info for all swarm machines
function createJson(data, mode, socket) {
  let dockerSystems = [];
  let dock = createSelection(data);
  let leaderflag = true;
  let managerflag = true;
  for(let i = 0; i < data.length; i = i + 1) {
    let dockerSystem = {};

 // this is for all systems
 if(mode === 'all')
 {
  dockerSystem.role = allselection(data[i]);
}
// all system ends here

// this is for Leader
if(mode === 'leader')
{
  leaderflag = leaderselection(data[i]);
  if(leaderflag) {
    dockerSystem.role = leaderflag;
  }
  else {
    continue;
  }
}
// Leader Ends here

// this is for manager
else if (mode === 'manager')
{
  managerflag = managerselection(data[i]);
  if(managerflag) {
    dockerSystem.role = managerflag;
  }
  else
  {
    continue;
  }
}
// manager ends here

  // This is for the worker
  else if(mode === 'worker') {
    if(Object.keys(data[i]).includes('ManagerStatus')) {
      continue;
    }
    else {
     dockerSystem.role = 'Swarm Worker';
   }
 }
  // Worker end here
  if(data[i].Status.State === 'ready') {
    dockerSystem.status = 'ready';
  }
  else {
    dockerSystem.status = 'down';
  }

  dockerSystem.id = data[i].ID;
  dockerSystem.name = data[i].Description.Hostname;
  dockerSystem.createdAt = calculateTime(new Date(data[i].CreatedAt).toLocaleString());
  dockerSystem.updatedAt = calculateTime(new Date(data[i].UpdatedAt).toLocaleString());
  dockerSystem.dropDown = dock;
  dockerSystems.push(dockerSystem);
}
if(socket === null) {
  return dockerSystems;
}
socket.emit('servers', dockerSystems);
return dockerSystems;
}

function getDataFromDocker(res, mode) {
  docker.listNodes(function(err, data) {
   res.json(createJson(data, mode, null));
 });
}

module.exports = {
  socketData: function(socket) {
    docker.listNodes(function (err, data) {
      createJson(data, 'all', socket);
    });
  },
  AllServers: function(req, res) {
    getDataFromDocker(res, 'all');
  },
  SwarmManager: function(req, res) {
    getDataFromDocker(res, 'manager');
  },
  SwarmWorker: function(req, res) {
    getDataFromDocker(res, 'worker');
  },
  SwarmLeader: function(req, res) {
    getDataFromDocker(res, 'leader');
  }
};
