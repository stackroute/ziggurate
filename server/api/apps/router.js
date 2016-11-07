const Router = require('express').Router();
const controller = require('./apps.controller');

Router.get('/:userId', controller.getApps);

module.exports = Router;
