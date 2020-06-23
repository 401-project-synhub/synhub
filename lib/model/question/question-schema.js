'use strict';

const mongoose = require('mongoose');
const questions = mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: Array, required: true },
    description: { type: String, required: true }

}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

// setTimeout(function () {
questions.virtual('answers', {
    ref: "answers",
    localField: "title",
    foreignField: "questionTitle",
    justOne: false,
});

questions.pre('find', function () {
    this.populate('answers');
})
// },100)
module.exports = mongoose.model('questions', questions);