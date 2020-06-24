'use strict';

require('@code-fellows/supergoose');

const questions = require('../../lib/model/question/question-model.js');
const answers = require('../../lib/model/answer/answer-model.js');

const questionObj = {
  author: 'Tommalieh',
  title: `what's pool drainage`,
  tags: ['db', 'mongo'],
  description: `what's happening`,
};
const answerObj = {
  author: 'Tommalieh',
  title: 'Use supergoose',
  description: 'you should use supergoose to test schema models',
  questionTitle: `what's pool drainage`,
};

describe('question-model', () => {
  it('creates a new record in the collection', () => {
    answers.create(answerObj);
    return questions.create(questionObj).then(result => {
      console.log(result);
      expect(result.author).toEqual(questionObj.author);
      expect(result.title).toEqual(questionObj.title);
      expect(result.description).toEqual(questionObj.description);
    });
  });
  it('reads a certain record from the database', () => {
    return questions.read().then(result => {
      console.log(result);
      expect(result[0].author).toEqual(questionObj.author);
      expect(result[0].title).toEqual(questionObj.title);
      expect(result[0].description).toEqual(questionObj.description);
    });
  });
  it('Updates the info of a certain record', () => {
    const newquestionObject = { 
      author: 'Tommalieh2',
      title: `what's pool drainage2`,
      tags: ['db', 'mongo2'],
      description: `what's happening2`,
    };
    return questions.read().then(result => {
      questions.update(result[0]._id, newquestionObject).then(result => {
        Object.keys(newquestionObject).forEach((key) => {
          expect(result[key]).toEqual(newquestionObject[key]);
        });
      });
    });
  });
});
