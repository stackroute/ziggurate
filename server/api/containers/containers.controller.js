const Router = require('express').Router();

const Docker = require('dockerode');

const docker = new Docker({socketPath: '/var/run/docker.sock'});


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
    today.getDate() - date.getDate(), ' days ago');
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

function getContainersFromDocker (res, data) {
    let containers = [];
    let containerinfo = {};
    for(let i = 0; i < data.length; i = i + 1) {
        containerinfo = {};
        containerinfo.id = data[i].Status.ContainerStatus.ContainerID;
        containerinfo.createdAt = calculateTime(new Date(data[i].CreatedAt).toLocaleString());
        containerinfo.updatedAt = calculateTime(new Date(data[i].UpdatedAt).toLocaleString());
        containerinfo.serviceID = data[i].ServiceID;
        if(data[i].DesiredState === 'shutdown')
        {
            containerinfo.desiredState = data[i].DesiredState;
            containers.push(containerinfo);
        }
        else if(data[i].DesiredState === 'running')
        {
            containerinfo.desiredState = data[i].DesiredState;
            containers.unshift(containerinfo);
        }
    }
    if(containers.length === 0) {
        res.json({state: 'false'});
    }
    else {
        res.json(containers);
    }
}

Router.post('/node', (req, res) => {
    docker.listTasks({filters: {node: [req.body.nodeId]}}, function(err, data)
    {
        getContainersFromDocker(res, data);
    });
});

module.exports = Router;
