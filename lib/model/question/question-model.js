'use strict';

const schema = require('./question-schema.js');
const Model = require('../model.js');

class Question extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Question;