'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const questions = require('../question/question-model.js');
const roles = require('../role/role-model.js');
const questions = require('../question/question-model.js');
const answers = require('../answer/answer-model.js');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  ranking: { type: String },
  imgUrl: { type: String },
  gender:{type: String},
  role:{ type: String, default: 'user', enum: ['admin','user']},
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

users.virtual('questions', {
  ref: 'questions',
  localField: 'username',
  foreignField: 'author',
  justOne: false,
});

users.pre('find', function () {
  this.populate('questions');
});


users.virtual('answers', {
  ref: 'answers', 
  localField: 'username',
  foreignField: 'author',
  justOne: false,
});

users.pre('find', function () {
  this.populate('answers');
});

users.virtual('capabilities', {
  ref: 'roles', 
  localField: 'role',
  foreignField: 'role',
  justOne: true,
});

users.pre('find', function () {
  this.populate('capabilities');
});

users.post('save', async function(){
  await this.populate('capabilities').execPopulate();
});

users.virtual('bookmarks', {
  ref:'bookmarks',
  localField:'username',
  foreignField:'username',
  justOne:true,
});
users.pre('find', function () {
  this.populate('bookmarks');
});

// users.virtual('answeredQuestions', {
//     ref: 'questions', 
//     localField: 'username',
//     foreignField: 'answers.author',
//     justOne: false,
// });

// users.pre('find', function () {
//     this.populate('answeredQuestions')
// });
module.exports = mongoose.model('users', users);