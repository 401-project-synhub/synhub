'use strict';

const superagent = require('superagent');
const users = require('../models/user.js');


const tokenServerUrl = process.env.TOKEN_SERVER_GITHUB;
const remoteAPI = process.env.REMOTE_API_GITHUB;
const CLIENT_ID = process.env.CLIENT_ID_GITHUB;
const CLIENT_SECRET= process.env.CLIENT_SECRET_GITHUB;
const API_SERVER = process.env.API_SERVER_GITHUB;

module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    // console.log(req.query);//works
    let remoteToken = await exchangeCodeForToken(code);
    // console.log(remoteToken);
    let remoteUser = await getRemoteUserInfo(remoteToken);
    // console.log('booom')
    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;

    next();
  } catch (e) { next(`ERROR: ${e.message}`); }

};

async function exchangeCodeForToken(code) {
  console.log(API_SERVER);
  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });
  console.log(tokenResponse.body);

  let access_token = tokenResponse.body.access_token;
  // console.log(access_token);

  return access_token;

}

async function getRemoteUserInfo(token) {
  // console.log(token);

  let userResponse =
    await superagent.get(remoteAPI)
      .set('Authorization', `token ${token}`)
      .set('user-agent', 'express-app');

  let user = userResponse.body;
  return user;

}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword',
  };
  let newUser = new user(userRecord);
  let user = await newUser.save(userRecord);
  let token = users.generateToken(user);

  return [user, token];

}