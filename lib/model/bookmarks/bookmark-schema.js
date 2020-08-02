'use strict';

const mongoose = require('mongoose');
/**
 * bookmarks module 
 * @module bookmarks
 */


const bookmarks = mongoose.Schema({
  username: {
    type: String,
    required:true,
  },
  bookmarked:{type:Array},
});

module.exports = mongoose.model('bookmarks', bookmarks);
