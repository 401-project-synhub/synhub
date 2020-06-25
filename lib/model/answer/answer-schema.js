'use strict';

const mongoose = require('mongoose');
const answers = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  questionTitle: { type: String, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

// answers.virtual('question', {
//     ref: "questions",
//     localField: "questionTitle",
//     foreignField: "title",
//     justOne: false,

// });

// answers.pre('find', function () {
//     this.populate('question');
// })

/**
 * Answers Schema  
 * @module answers
 */

module.exports = mongoose.model('answers', answers);