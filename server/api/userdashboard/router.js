const Router = require('express').Router();
const controller = require('./userdashboard.controller');

Router.get('/:username', controller.getUserInfo);
module.exports = Router;
