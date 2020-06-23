'use strict';

const express = require('express');
// const bcrypt = require('bcryptjs');
const users = require('../../lib/model/user/user-model.js');
const githubOauthMiddleware = require('../auth-middleware/github.js');
const linkedinOauthMiddleware = require('../auth-middleware/linedin.js');
const basicAuth = require('../auth-middleware/basic.js');

console.log(githubOauthMiddleware.toString());

//create router
const router = express.Router();

//routes

router.get('/oauth', githubOauthMiddleware, oauthHandler);
router.get('/linkedoauth',linkedinOauthMiddleware,oauthHandler);
router.get('/signin', basicAuth, signInHandler);
router.post('/signup', signUpHandler);

//routes functions 
function oauthHandler(req, res, next){
  res.json({
    token: req.token,
  });
}

function signInHandler(req, res, next){
  res.json({
    token: req.token,
  });
}

function signUpHandler(req, res, next){
  users.createUser(req.body).then(token => {
    res.json({ token });
  }).catch(err => {
    res.status(403).send(err);
  });
}
module.exports = router;
