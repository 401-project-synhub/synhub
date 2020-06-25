'use strict';
const userSchema= require('../lib/model/user/user-model.js');
const bearer = require('../src/auth-middleware/bearer.js');
describe('Bearer auth', () => {
  it('Should call next with an error when headers are invalid', () => {
    const req ={
      headers:{},
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Header');
  });
  it('Should call next with an error when auth type is not bearer', ()=>{
    const req ={
      headers: { authorization: 'Bear lmshyeof254852' },
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid auth header');
  });
  it('Should call next properly when valid headers are provided', () => {
    const req ={
      headers: { authorization: 'Bearer lmshyeof254852' },
    };
    const res = {};
    const next = jest.fn();
    bearer(req, res, next);
    const token= 'lmshyeof254852';
    expect(userSchema.authenticateToken(token).then(user=>expect(user).toBeUndefined));
  });

});