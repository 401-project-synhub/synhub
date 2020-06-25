'use strict';
const schema = require('./role-schema.js');
const Model = require('../model.js');

/**
 * Role Model 
 * @class Role
 */

class Role extends Model{
  constructor(){
    super(schema);
  }
    
}
/**
 * Role module 
 * @module Role
 */
module.exports = new Role;