'use strict';

'use strict';

require('@code-fellows/supergoose');

const roles = require('../../lib/model/role/role-model.js');

const roleObj = {

  role: 'admin',
  capabilities: ['ask', 'answer', 'update', 'delete'],
};

describe('role-model', () => {
  it('creates a new record in the collection', () => {
    return roles.create(roleObj).then(result => {
      expect(result.role).toEqual(roleObj.role);
      expect(result.capabilities).toBeTruthy();
    });
  });
  it('reads a certain record from the database', () => {
    return roles.read().then(result => {
      expect(result[0].role).toEqual(roleObj.role);
      expect(result[0].capabilities).toBeTruthy();
    });
  });
  it('Updates the info of a certain record', () => {
    const newroleObject = { 
      author: 'Tommalieh2',
      title: 'Use supergoose2',
      description: 'you should use supergoose to test schema models2',
      questionTitle: 'How can i test a schema model2',
    };
    return roles.read().then(result => {
      roles.update(result[0]._id, newroleObject).then(result => {
        Object.keys(newroleObject).forEach((key) => {
          expect(result[key]).toEqual(newroleObject[key]);
        });
      });
    });
  });
  it('Deletes a certain record', () => {
    return roles.read().then(result => {
      roles.delete(result[0]._id).then(result => {
        roles.read().then(result => {
          expect(result).toBe(undefined);
        });
      });
    });
  });
});