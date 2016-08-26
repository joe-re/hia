const assert = require('power-assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('questionParams', () => {
  let prompt = null;
  let questionParams;
  let args = {};
  let params = {};
  beforeEach(() => {
    questionParams = proxyquire('../src/questionParams.js', { prompt });
  });

  describe('has config of question args', () => {
    describe("doesn't have received args of same name", () => {
      before(() => {
        prompt = { start: sinon.stub(), get: sinon.stub() };
        params = { question_args: { aliase: 'q', description: 'question args.', question: true } };
      });
      it('is questioned', () => {
        return questionParams('./test', args, params).then(() => {
          assert(prompt.start.calledOnce);
          assert(prompt.get.calledOnce);
        });
      });
    });

    describe('has received args of same name', () => {
      before(() => {
        prompt = { start: sinon.stub(), get: sinon.stub() };
        params = { question_args: { aliase: 'q', description: 'question args.', question: true } };
        args = { question_args: 'already received' };
      });
      it("isn't questioned", () => {
        return questionParams('./test', args, params).then(() => {
          assert.equal(prompt.start.callCount, 0);
        });
      });
    });
  });
});
