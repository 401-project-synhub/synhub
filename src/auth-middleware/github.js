'use strict';

const superagent = require('superagent');
const users = require('../../lib/model/user/user-model.js');

const tokenServerUrl = process.env.TOKEN_SERVER_GITHUB;
console.log('tokenServerUrl', tokenServerUrl);

const remoteAPI = process.env.REMOTE_API_GITHUB;
console.log('remoteAPI', remoteAPI);

const CLIENT_ID = process.env.CLIENT_ID_GITHUB;
console.log('CLIENT_ID', CLIENT_ID);

const CLIENT_SECRET= process.env.CLIENT_SECRET_GITHUB;
console.log('CLIENT_SECRET', CLIENT_SECRET);

const API_SERVER = process.env.API_SERVER_GITHUB;
console.log('API_SERVER', API_SERVER);


/**
 * GitHub Oauth middleware
 * @module github
 */

module.exports = async (req, res, next) => {
  console.log('hello from github');

  try {
    let code = req.query.code;
    console.log('code', code);
    let remoteToken = await exchangeCodeForToken(code);
    let remoteUser = await getRemoteUserInfo(remoteToken);
    let [user, token] = await getUser(remoteUser);
    // console.log('user', user);
    req.user = user;
    req.token = token;

    next();
  } catch (e) { next(`ERROR: ${e.message}`); }

};

async function exchangeCodeForToken(code) {
  console.log('api server' ,API_SERVER);
  console.log('code2', code);
  let tokenResponse = await superagent.post('https://github.com/login/oauth/access_token').send({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });
  console.log('tokenResponse' ,tokenResponse.body);

  let access_token = tokenResponse.body.access_token;

  return access_token;

}

async function getRemoteUserInfo(token) {

  let userResponse =
    await superagent.get(remoteAPI)
      .set('Authorization', `token ${token}`)
      .set('user-agent', 'express-app');

  let user = userResponse.body;
  console.log(user);
  return user;

}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword',
    ranking: 'super',
    imgUrl: 'asdasdsadas',
  };

  let user = await users.create(userRecord);
  let token = users.generateToken(user);

  return [user, token];

}