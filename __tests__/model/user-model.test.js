'use strict';

require('@code-fellows/supergoose');
const users = require('../../lib/model/user/user-model.js');
const roles = require('../../lib/model/role/role-model.js');
const roleObject = {
  role: 'admin',
  capabilities: ['ask', 'answer', 'update', 'delete'],
};

// roles.create(roleObject);

const userObject = {
  username: 'Tommalieh',
  password: 'Strong Password',
  ranking: 'not bad',
  imgUrl: 'image url',
  role: 'admin',
};

describe('user-model', () => {
  it('creates a new record in the collection', () => {
    roles.create(roleObject);
    return users.create(userObject).then(result => {
      console.log(result);

      Object.keys(userObject).forEach(key => {
        userObject.password = result.password;
        expect(result[key]).toEqual(userObject[key]);
      });
    });
  });
  it('reads a certain record from the database', () => {
    return users.read().then(result => {
      console.log(result);
      Object.keys(userObject).forEach(key => {
        userObject.password = result[0].password;
        expect(result[0][key]).toEqual(userObject[key]);
      });
    });
  });
  // it('Updates the info of a certain record', () => {
  //   const newuserObject = { 
  //     username: 'Tommalieh2',
  //     password: 'Strong Password2',
  //     ranking: 'not bad2',
  //     imgUrl: 'image url2',
  //   };
  //   return users.read().then(result => {
  //     console.log(result[0]._id);
  //     users.update(result[0]._id, newuserObject).then(result => {
  //       console.log(result);
  //       Object.keys(newuserObject).forEach((key) => {
  //         console.log(newuserObject);
  //         newuserObject.password = result[0].password;
  //         console.log(newuserObject.password);
  //         expect(result[key]).toEqual(newuserObject[key]);
  //       });
  //     });
  //   });
  // });
  //   it('Deletes a certain record', () => {
  //     return users.read().then(result => {
  //       users.delete(result[0]._id).then(result => {
  //         users.read().then(result => {
  //           expect(result).toBeUndefined();
  //         });
  //       });
  //     });
  //   });

  it('basicAuth, compares pass and returns a value', () => {
    return users.basicAuth(userObject).then(result => {
      console.log(result);
      expect(result).toBe(null);
    });
  });
  it('basicAuth, returns an error message when password is not correct', () => {
    const newUserObject = {
      username: 'wrong',
      password: 'Strong Password',
      ranking: 'not bad',
      imgUrl: 'image url',
      role: 'admin',
    };
    return users.basicAuth(newUserObject).then(result => {
      console.log(result);
      expect(result).toBe(undefined);
    });
  });
  it('generates a token when passing a correct user', () => {
    let resultToken = users.generateToken(userObject);
    return users.authenticateToken(resultToken).then(resultObj => {
      console.log(resultObj);
      expect(resultObj.username).toEqual(userObject.username);
    });
  });
  // it('returns undefined when authenticating a false token', () => {
  //   let resultToken = 'false Token';
  //   return users.authenticateToken(resultToken).then(resultObj => {
  //     console.log(resultObj);
  //     expect(resultObj.username).toBe(undefined);
  //   });
  // });
});