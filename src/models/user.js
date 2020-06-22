// 'use strict';


// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken'); 
// const mongoose = require('mongoose');


// const SECRET = process.env.SECRET || 'batool123';

// /**
//  * User Model
//  * @module
//  * @param {object}  - The record of the book.
//  */

// const Users = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// }); 


// /**
//  * Hashing the passward and save a record
//  * @returns {void} nothing
//  */

// Users.pre('save', async function () {
  
//   this.password = await bcrypt.hash(this.password, 5);
// });


// /**
//  * Basic Auth
//  * @param {object} auth - The authintication object 
//  * @returns {string} hashed password
//  */
// Users.statics.basicAuth = function (auth) { 
//   let password = { username: auth.user };
//   return this.findOne(password)
//     .then(user => {
//       return user.passwordComparator(auth.pass);
//     })
//     .catch(console.error);
// };

// /**
//  * Password Comparator
//  * @param {string} pass - The authintication object 
//  * @returns {string} password if valid
//  */

// Users.methods.passwordComparator = function (pass) {
//   return bcrypt.compare(pass, this.password)
//     .then(valid => {
//       return valid ? this : null;
//     });
// };


// /**
//  * Token Generator
//  * @returns {object} token
//  */

// Users.methods.generateToken = function () {
//   let capabilities= this.can(this.role);
//   let token = 
//   jwt.sign({  role: this.role, id:this._id ,user:this.username,capabilities: capabilities ,expiresIn:  900000, algorithm:  'RS256' }, SECRET);  return token;
// };

// /**
//  * Authenticate Token
//  * @param {string} token - The token  
//  * @returns {object} user token object
//  */

// Users.statics.authenticateToken = async function(token){
//   try {
//     let tokenObject = await jwt.verify(token, SECRET);

//     if (tokenObject.user) {
//       return Promise.resolve(tokenObject);
//     } else {
//       return Promise.reject('User is not found!');
//     }
//   } catch (e) {
//     return Promise.reject(e.message);
//   }
// };

// /**
//  * list
//  * @returns {Array} list of user 
//  */

// Users.statics.list =  async function(){
//   let results = await this.find({});
//   return results;
// };


// module.exports = mongoose.model('users', Users);