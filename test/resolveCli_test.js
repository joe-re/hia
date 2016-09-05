const assert = require('power-assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
import Config from '../src/Config.js';

describe('resolveCli', () => {
  let resolveCli;
  let mockMeow;
  let config;

  before(() => {
    config = new Config('./test/hia.yaml').read();
  });

  beforeEach(() => {
    resolveCli = proxyquire('../src/resolveCli.js', { meow: () => mockMeow });
  });

  describe('show help', () => {
    describe('execute with -h option', () => {
      before(() => {
        mockMeow = {
          input: [ 'test:view', 'input' ],
          flags: { h: true },
          showHelp: sinon.stub()
        };
      });
      it('shows help', () => {
        resolveCli(config);
        assert(mockMeow.showHelp.calledOnce);
      });
    });

    describe('execute with wrong subcommand', () => {
      before(() => {
        mockMeow = {
          input: [ 'wrooooong', 'input' ],
          flags: { },
          showHelp: sinon.stub()
        };
      });
      it('shows help', () => {
        resolveCli(config);
        assert(mockMeow.showHelp.calledOnce);
      });
    });

    describe('execute with correct subcommand', () => {
      before(() => {
        mockMeow = {
          input: [ 'test:view', 'input' ],
          flags: { },
          showHelp: sinon.stub()
        };
      });
      it("doesn't shows help", () => {
        resolveCli(config);
        assert.equal(mockMeow.showHelp.callCount, 0);
      });
    });
  });

  describe('convert to cli params', () => {
    describe('resolve arg name', () => {
      before(() => {
        mockMeow = {
          input: [ 'test:view', 'input' ],
          flags: { feature_name: 'calendar' }
        };
      });
      it('receives converted parameters', () => {
        const resolved = resolveCli(config);
        assert.equal(resolved.subcommand, 'test:view');
        assert.equal(resolved.input, 'input');
        assert.equal(resolved.args.feature_name, 'calendar');
      });
    });

    describe('resolve aliase', () => {
      before(() => {
        mockMeow = {
          input: [ 'test:view', 'input' ],
          flags: { f: 'calendar' }
        };
      });
      it('receives converted parameters', () => {
        const resolved = resolveCli(config);
        assert.equal(resolved.subcommand, 'test:view');
        assert.equal(resolved.input, 'input');
        assert.equal(resolved.args.feature_name, 'calendar');
      });
    });
  });
});
