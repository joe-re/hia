const assert = require('power-assert');
const argsResolve = require('../src/argsResolve.js');

const args = {};
const params = {
  question_args: {
    aliase: 'q',
    description: 'question args.',
    question: true
  }
};
describe('argsResolve', () => {
  describe('test', () => {
    it('test', () => {
      argsResolve('./', args, params);
    });
  });
});
