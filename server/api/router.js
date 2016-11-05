const Router = require('express').Router();

Router.get('/ping', function(req, res) {
  res.send('PONG');
});
Router.use(require('body-parser').json());

Router.use('/auth', require('./auth'));
Router.use('/repos', require('./repos'));
Router.use('/repo', require('./repos'));
Router.use('/nodes', require('./nodes'));
Router.use('/containers', require('./containers'));
Router.use('/dashboard', require('./admindashboard'));


module.exports = Router;
