'use strict';

const {server} = require('../../app.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const mongoose = require('mongoose');
require('../../lib/routes/api-v1.js');

afterAll(() => mongoose.disconnect());


xdescribe('api-v1', () => {
  it('Should respond with 404 for non existing route', () => {
    return mockRequest.get('/api/v1/questions').then(result => {
    //   console.log(result);
      expect(result.status).toBe(200);
    });
  });
});