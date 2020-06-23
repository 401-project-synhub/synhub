'use strict';
/**
 * Basic Auth middleware
 * @module basic
 */

const base64 = require('base-64');
const userSchema = require('../../lib/model/user/user-model.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Username Or Password');
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [user, pass] = base64.decode(basic).split(':');
    const userObj = { username: user, password: pass };
    userSchema
      .basicAuth(userObj)
      .then((isValid) => {
        console.log('isValid', isValid);
        if (isValid) {
          req.token = userSchema.generateToken(isValid);
          next();
        }
        else {
          next('Invalid Username or Password null');

        }
      })
      .catch((err) => next(err.message));
  }
};