const Router = require('express').Router();
const controller = require('./containers.controller');

Router.get('/node/:nodeId', controller.containers);
Router.get('/replicas/:serviceName', controller.replicas);
module.exports = Router;
