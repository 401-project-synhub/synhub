'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const questions = require('../question/question-model.js');

const users = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    ranking: { type: String, required: true },
    imgUrl: { type: String, required: true }
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
    this.populate('questions')
});

users.virtual('answers', {
    ref: 'answers', 
    localField: 'username',
    foreignField: 'author',
    justOne: false,
});

users.pre('find', function () {
    this.populate('answers')
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