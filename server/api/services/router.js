const Router = require('express').Router();
const controller = require('./services.controller');

Router.get('/:appname', controller.getUserServices);

module.exports = Router;
