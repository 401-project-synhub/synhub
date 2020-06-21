'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');

const githubOauthMiddleware = require('../auth-middleware/github.js');
const linkedinOauthMiddleware = require('../auth-middleware/linedin.js');




//create router
const router = express.Router();

//routes


router.get('/oauth',githubOauthMiddleware, signIn);
router.get('/linkedoauth',linkedinOauthMiddleware,signIn);







//routes functions 
function signIn(req, res, next){
  res.json({
    token: req.token ,
    id:req.id,
    bio:req.bio,
    username:req.login,
  });
}
module.exports = router;
