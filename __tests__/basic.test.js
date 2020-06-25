'use strict';
require('@code-fellows/supergoose');
const basicAuth = require('../src/auth-middleware/basic.js');
const userSchema= require('../lib/model/user/user-model.js');
let res = {};
let next = jest.fn();

describe('basicAuth ', () => {
  it('Should call next with an error when no headers provided', () => {
    let req = { headers: { authorization: null } };
    basicAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('Should call next properly when headers are there', () => {
    let req = { headers: { authorization: 'Basic ramesimls15978' } };
    basicAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('Should call next properly when user is valid', ()=>{
    const fakeUser = {
      username:'fakeuser',
      password:'fakepass',
      rank:'fakerank',
      imgUrl:'fakelink.link',
    };
    expect(userSchema.basicAuth(fakeUser).then(data=>expect(data).toBeUndefined));
  });
});