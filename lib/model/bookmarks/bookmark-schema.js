'use strict';

const mongoose = require('mongoose');
/**
 * bookmarks module 
 * @module bookmarks
 */


const bookmarks = mongoose.Schema({
  user: {
    type: String,
    required:true,
  },
  bookmarked:{type:Object},
});

module.exports = mongoose.model('bookmarks', bookmarks);
