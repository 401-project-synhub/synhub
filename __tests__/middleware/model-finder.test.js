'use strict';

const modelFinder = require('../../lib/middleware/model-finder.js');
const questionsModel = require('../../lib/model/question/question-model.js');
const answersModel = require('../../lib/model/answer/answer-model.js');
const usersModel = require('../../lib/model/user/user-model.js');
let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterEach (() => {
  consoleSpy.mockRestore();
});

describe('model-finder middleware', () => {
  it('should return the right model when one is passed', () => {
    const req ={params:{model: 'questions'}};
    const res = {};
    const next = jest.fn();
    console.log(req.params.model);
    modelFinder(req, res, next);
    expect(req.model).toEqual(questionsModel);
    expect(next).toBeCalledWith();
    expect(consoleSpy).toHaveBeenCalledWith('hi from case 1');
  });
  it('should return the right model when one is passed', () => {
    const req ={params:{model: 'answers'}};
    const res = {};
    const next = jest.fn();
    console.log(req.params.model);
    modelFinder(req, res, next);
    expect(req.model).toEqual(answersModel);
    expect(next).toBeCalledWith();
    expect(consoleSpy).toHaveBeenCalledWith('hi from case 2');
  });
  it('should return the right model when one is passed', () => {
    const req ={params:{model: 'users'}};
    const res = {};
    const next = jest.fn();
    console.log(req.params.model);
    modelFinder(req, res, next);
    expect(req.model).toEqual(usersModel);
    expect(next).toBeCalledWith();
    expect(consoleSpy).toHaveBeenCalledWith('hi from case 3');
  });
  it(`shouldn't return a model when wrong one is passed`, () => {
    const req ={params:{model: 'wrong model'}};
    const res = {};
    const next = jest.fn();
    console.log(req.params.model);
    modelFinder(req, res, next);
    expect(req.model).toEqual(undefined);
    expect(next).toBeCalledWith('Invalid Model Please Choose <questions> or <answers> or <users>');
    expect(consoleSpy).toHaveBeenCalledWith('wrong model');
  });
});