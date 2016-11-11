const Router = require('express').Router();
const controller = require('./admindashboard.controller');

Router.get('/admin', controller.admin);
module.exports = Router;
