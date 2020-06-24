'use strict';

const schema = require('./question-schema.js');
const Model = require('../model.js');

/**
 * Questions model
 * @class Question
 */

class Question extends Model {
  constructor() {
    super(schema);
  }
}

/**
 * question module 
 * @module Question
 */

module.exports = new Question;