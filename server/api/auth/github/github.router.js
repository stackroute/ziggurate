const Router = require('express').Router();
const controller = require('./github.controller');

const authMiddleware = require('../middleware');

Router.get('/login', controller.url);
Router.get('/complete', controller.complete);
Router.get('/me', authMiddleware, controller.me);

module.exports = Router;
