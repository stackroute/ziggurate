/* eslint camelcase:0 */

const config = require('../../../config');
const request = require('superagent');
require('superagent-auth-bearer')(request);
const jsonwebtoken = require('jsonwebtoken');

function getOrganisations(response0, callback) {
  let adm = 'user';
  request
  .get(response0.organizations_url.toString())
  .set('User-Agent', config.USER_AGENT)
  .set('Accept', 'application/json')
  .end(function(err, response1) {
    if(err) {
      response0.status(500).json(err); return;
    }
    if(response1.body.length === 0) {
      adm = 'user';
    }
    else
    {
      for(let i = 0; i < response1.body.length; i = i + 1) {
        if(response1.body[i].login === config.GITHUB_ORGANISATION) {
          adm = 'admin';
          break;
        }
      }
    }
    response0.userType = adm;
    callback(null, response0);
    return;
  });
}

function getUser(token, callback) {
  request
  .get('https://api.github.com/user')
  .set('User-Agent', config.USER_AGENT)
  .set('Accept', 'application/json')
  .authBearer(token)
  .end(function(err, response) {
   if(err) { callback(err); return; }
   callback(null, response.body);
   return;
 }
 );
}

module.exports = {
  url: function(req, res) {
    res.send('https://github.com/login/oauth/authorize?client_id=' + config.GITHUB_CLIENT_ID);
  },
  complete: function(req, res) {
    const code = req.query.code;
    request
    .get('https://github.com/login/oauth/access_token')
    .query({
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      code: code
    })
    .end(function(err0, response0) {
      if(err0) { res.status(500).json(err0); return; }
      const accessToken = response0.body.access_token;
      getUser(accessToken, function(err1, response1) {
        if(err1) { res.status(500).json(err1); return; }

        getOrganisations(response1, function(err2, response2) {
          jsonwebtoken.sign({
            roles: [response2.userType],
            accessToken: accessToken
          }, config.JWT_SECRET, {
            subject: response2.id.toString(),
            issuer: config.USER_AGENT
          }, function(err3, jwt) {
            if(err3) { res.status(500).json(err3); return; }
              res
              .cookie('token', jwt)
              .redirect('/#/dashboard');
            return;
          });
        });
      }
      );
    });},
    me: function(req, res) {
      const claims = req.claims;
      getUser(claims.accessToken, function(err, user) {
        if(err) { res.status(500).err(err); return; }
        res.json(user);
      });
    }
  };
