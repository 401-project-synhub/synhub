const permission = require('../src/auth-middleware/authorize.js');
let res = {};
let next = jest.fn();

describe('ACL ', () => {
  it('Should call next with an error when requestObj is invalid', () => {
    let req = { user: 'whatever' };
    permission('ask')(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
  it('Should call next properly when capability is valid', () => {
    let req = { user: { capabilities: { capabilities: ['ask', 'answer', 'delete'] } } };
    permission('ask')(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('Should call next with an error when capability is invalid', () => {
    let req = { user: { capabilities: { capabilities: ['ask', 'answer', 'delete'] } } };
    permission('update')(req, res, next);
    expect(next).toHaveBeenCalledWith('Access Denied!!');
  });
});