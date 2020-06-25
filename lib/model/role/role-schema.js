'use strict';

const mongoose = require('mongoose');

const roles = mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  capabilities:{
    type: Array,
    required: true,
  },
});

/**
 * roles module 
 * @module roles
 */

module.exports = mongoose.model('roles', roles);