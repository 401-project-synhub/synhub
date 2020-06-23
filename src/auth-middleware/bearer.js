'use strict';
const users = require('../../lib/model/user/user-model.js');

module.exports = (req, res, next)=>{
  if(!req.headers.authorization){
    next('Invalid Header');
  }else{
    const [auth, token] = req.headers.authorization.split(' ');
    console.log('auth', auth);
    console.log('token', token);

    if(auth === 'Bearer'){
      users
        .authenticateToken(token)
        .then(validUser => {
          console.log('validUser', validUser);
          req.user = validUser;
          next();
        }).catch( e => next('Invalid login', e.message));
    }else{
      next('Invalid auth header');
    }
  }
};