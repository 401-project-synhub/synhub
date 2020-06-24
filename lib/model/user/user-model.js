'use strict';

const schema = require('./user-schema.js');
const Model = require('../model.js');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const SECRET = process.env.SECRET || 'batool123';


class User extends Model {
  constructor() {
    super(schema);
  }

  async createUser(record){

    try {
      const result = await this.readOne({ username: record.username });
      console.log('result', result);

      if (result.length === 0) {
        const newRecord = await this.create(record);
        console.log('newRecord', newRecord);
        return {token: this.generateToken(newRecord), message: 'signed up'};
      }
      else {
        return {token: {result}, message: 'signed in'};
      }
    } catch (err) {
      return err;
    }
  }

  basicAuth(userObj){
    let username = { username: userObj.username };
    return this.readOne(username)
      .then(user => {
        if(user.length !== 0){
          console.log('user', user);
          return this.passwordComparator(user ,userObj.password);
        }
        else{
          console.log('hello');
          Promise.reject('Please SignUp First');
        }
      })
      .catch(console.error);
  }
  async passwordComparator(user, pass){
    console.log('userpassowrd', user.password);

    console.log('userpassowrd', user[0].password);
    console.log('pass', pass);

    
    return await bcrypt.compare(pass, user[0].password)
      .then(valid => {
        console.log('valid', valid);
        console.log(this);
        return valid ? user : null;
      });
  }
  generateToken(user){
    console.log('jwtuser' ,user);
    // let capabilities= this.can(this.role);
    let token = 
    // jwt.sign({  role: this.role, id:this._id ,user:this.username,capabilities: capabilities ,expiresIn:  900000, algorithm:  'RS256' }, SECRET);  return token;
    jwt.sign({  id: user._id, username: user.username, capabilities:user.capabilities, expiresIn: 900000, algorithm: 'RS256' }, SECRET);
    console.log('jwtToken', token);
    return token;
  }
  async authenticateToken(token){

    try {
      console.log('jwtverify',jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjIzZWZjYWQwNWRiMWRkZjNjMGVjMSIsInVzZXJuYW1lIjoieW91c2VmMyIsImV4cGlyZXNJbiI6OTAwMDAwLCJhbGdvcml0aG0iOiJSUzI1NiIsImlhdCI6MTU5MjkzNDE0MH0.5fWcK_i6C_tkY5jtJZI8oHyrc0pFrZ3ah_5HuiQLnKg', SECRET));
      let tokenObject = await jwt.verify(token, SECRET);
      console.log('tokenObject', tokenObject);
      console.log('tokenObject.username', tokenObject.username);

      if (tokenObject.username) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject('User is not found!');
      }
    }catch(e){
      return Promise.reject(e.message);
    }
  }
}

module.exports = new User();