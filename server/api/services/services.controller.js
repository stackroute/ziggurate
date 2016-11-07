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

function getServicesFromDocker(res, data) {
   let services = [];
   let serviceInfo = {};
   for(let i = 0; i < data.length; i = i + 1) {
      serviceInfo = {};
      serviceInfo.serviceId = data[i].ID;
      serviceInfo.name = data[i].Spec.Name;
      serviceInfo.createdAt = calculateTime(new Date(data[i].CreatedAt).toLocaleString());
      serviceInfo.updatedAt = calculateTime(new Date(data[i].UpdatedAt).toLocaleString());
      serviceInfo.replicas = data[i].Spec.Mode.Replicated.Replicas;
      serviceInfo.imageName = data[i].Spec.TaskTemplate.ContainerSpec.Image;

      services.push(serviceInfo);
   }
   res.send(services);
}

Router.post('/service', (req, res) => {
   docker.listServices(function(err, data) {
      getServicesFromDocker(res, data);
   });
});

module.exports = Router;
