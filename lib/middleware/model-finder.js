'use strict';

const questions = require('../model/question/question-model.js');
const answers = require('../model/answer/answer-model.js');
const users = require('../model/user/user-model.js');

/**
* @function getModel
* @param req
* @param res
* @param next 
* @returns {string} model
*/

function getModel(req, res, next){
  const model = req.params.model;
  console.log(req.params.model);
  switch (model) {
  case ('questions'):
    console.log('hi from case 1');
    req.model = questions;
    next();
    return;

  case ('answers'):
    console.log('hi from case 2');
    req.model = answers;
    next();
    return;

  case ('users'):
    console.log('hi from case 3');
    req.model = users;
    next();
    return;

  default:
    next('Invalid Model Please Choose <questions> or <answers> or <users>');
    return;

  }
}

module.exports = getModel;