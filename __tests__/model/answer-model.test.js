'use strict';

require('@code-fellows/supergoose');

const answers = require('../../lib/model/answer/answer-model.js');

const answerObj = {
  author: 'Tommalieh',
  title: 'Use supergoose',
  description: 'you should use supergoose to test schema models',
  questionTitle: 'How can i test a schema model',
};

describe('asnwer-model', () => {
  it('creates a new record in the collection', () => {
    return answers.create(answerObj).then(result => {
      Object.keys(answerObj).forEach(key => {
        expect(result[key]).toEqual(answerObj[key]);
      });
    });
  });
  it('reads a certain record from the database', () => {
    return answers.read().then(result => {
      Object.keys(answerObj).forEach(key => {
        expect(result[0][key]).toEqual(answerObj[key]);
      });
    });
  });
  it('Updates the info of a certain record', () => {
    const newAnswerObject = { 
      author: 'Tommalieh2',
      title: 'Use supergoose2',
      description: 'you should use supergoose to test schema models2',
      questionTitle: 'How can i test a schema model2',
    };
    return answers.read().then(result => {
      answers.update(result[0]._id, newAnswerObject).then(result => {
        Object.keys(newAnswerObject).forEach((key) => {
          expect(result[key]).toEqual(newAnswerObject[key]);
        });
      });
    });
  });
  it('Deletes a certain record', () => {
    return answers.read().then(result => {
      answers.delete(result[0]._id).then(result => {
        answers.read().then(result => {
          expect(result).toBe(undefined);
        });
      });
    });
  });
});