'use strict';

const schema = require('./bookmark-schema');
const Model = require('../model');

/**
 * Bookmarks model
 * @class Bookmarks
 */

class Bookmarks extends Model {
  constructor() {
    super(schema);
  }
}

/**
 * Bookmarks module 
 * @module Bookmarks
 */

module.exports = new Bookmarks;