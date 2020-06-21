'use strict';
const users = require('../models/users');

module.exports = (req, res, next)=>{
  if(!req.headers.authorization){
    next('Invalid Header');
  }else{
    const [auth, token] =req.headers.authorization.split(' ');
    if(auth ==='Bearer'){
      users
        .authenticateToken(token)
        .then(validUser=>{
          req.user = validUser;
          next();
        }).catch(e=>next('Invalid login', e.message));
    }else{
      next('Invalid auth header');
    }
  }
};