'use strict';

const schema = require('./answer-schema.js');
const Model = require('../model.js');

class Answer extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Answer;