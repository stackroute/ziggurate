const Router = require('express').Router();
const controller = require('./servers.controller');

Router.get('/All-Servers', controller.AllServers);
Router.get('/Swarm-Manager', controller.SwarmManager);
Router.get('/Swarm-Worker', controller.SwarmWorker);
Router.get('/Swarm-Leader', controller.SwarmLeader);

module.exports = Router;
