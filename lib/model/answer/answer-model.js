'use strict';

const schema = require('./answer-schema.js');
const Model = require('../model.js');

/**
 * answers model 
 * @class Answer
 */

class Answer extends Model {
  constructor() {
    super(schema);
  }
}


/**
 * Answer module 
 * @module Answer
 */
module.exports = new Answer;