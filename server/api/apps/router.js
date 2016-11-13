const Router = require('express').Router();
const controller = require('./apps.controller');

Router.get('/app/:username', controller.getUserApps);
// Router.get('/services/:username', controller.getUserApps);

module.exports = Router;
