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

module.exports = mongoose.model('roles', roles);