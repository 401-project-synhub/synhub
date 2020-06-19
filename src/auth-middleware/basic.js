'use strict';
/**
 * Basic Auth middleware
 * @module basic
 */

const base64= require('base-64');
const userSchema= require('../models/user.js');

module.exports= (req, res, next)=>{
    if (!req.headers.authorization) {
        next('Invalid Username Or Password');
      } else {
        const basic = req.headers.authorization.split(' ').pop();
        const [user, pass] = base64.decode(basic).split(':');
        const userObj= {user:user, pass:pass}
        userSchema
          .basicAuth(userObj)
          .then(() => {
            req.token = userSchema.generateToken();
            next();
          })
          .catch((err) => next(err.message));
      }
}