'use strict';
const schema = require('./role-schema.js');
const Model = require('../model.js');

class Role extends Model{
  constructor(){
    super(schema);
  }
    
}

module.exports = new Role;