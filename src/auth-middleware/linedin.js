'use strict';

const superagent = require('superagent');
const users = require('../../lib/model/user/user-model.js');


const tokenServerUrl = process.env.TOKEN_SERVER_LINKEDIN;
const remoteAPI = process.env.REMOTE_API_LINKEDIN;
const CLIENT_ID = process.env.CLIENT_ID_LINKEDIN;
const CLIENT_SECRET = process.env.CLIENT_SECRET_LINKEDIN;
const API_SERVER = process.env.API_SERVER_LINKEDIN;

module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log(req.query);
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    // console.log('(2) ACCESS TOKEN:', remoteToken);

    let remoteUser = await getRemoteUserInfo(remoteToken);
    // console.log('(3) GITHUB USER', remoteUser);

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    // console.log('(4) LOCAL USER', user);

    next();
  } catch (e) { next(`ERROR: ${e.message}`); }

};

async function exchangeCodeForToken(code) {

  let tokenResponse = await superagent.post(tokenServerUrl)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code',
    });

  let access_token = tokenResponse.body.access_token;

  return access_token;

}

async function getRemoteUserInfo(token) {

  let userResponse =
    await superagent.get(remoteAPI)
      .set('user-agent', 'express-app')
      .set('Authorization', `Bearer ${token}`);

  let user = userResponse.body;
  console.log(user);
  return user;

}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.localizedLastName,
    password: 'oauthpassword',
    ranking: 'elite',
    imgUrl: 'asdasdsadas',
  };

  let user = await users.create(userRecord);
  let token = users.generateToken(user);

  return [user, token];

}