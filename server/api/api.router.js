var Router= require('express').Router();

Router.use(require('body-parser').json());
Router.use('/nodes',require('./nodes/nodes.controller'));
Router.use('/oauth',require('./auth/auth.controller'));

module.exports=Router;
