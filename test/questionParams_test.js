const assert = require('power-assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
import Config from '../src/Config.js';

describe('questionParams', () => {
  let prompt = null;
  let questionParams;
  let args = {};
  let config;
  before(() => {
    config = new Config('./test/hia.yaml').read();
  });

  beforeEach(() => {
    questionParams = proxyquire('../src/questionParams.js', { prompt });
  });

  describe('has config of question args', () => {
    describe("doesn't have received args of same name", () => {
      before(() => {
        prompt = { start: sinon.stub(), get: sinon.stub() };
      });
      it('is questioned', () => {
        return questionParams(config, { subcommand: 'test:view', args: {} }).then(() => {
          assert(prompt.start.calledOnce);
          assert(prompt.get.calledOnce);
        });
      });
    });

    describe('has received args of same name', () => {
      before(() => {
        prompt = { start: sinon.stub(), get: sinon.stub() };
        args = { question_args: 'already received' };
      });
      it("isn't questioned", () => {
        return questionParams(config, { subcommand: 'test:view', args }).then(() => {
          assert.equal(prompt.start.callCount, 0);
        });
      });
    });
  });
});
