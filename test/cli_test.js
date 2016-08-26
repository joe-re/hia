const assert = require('power-assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const readYAML = require('../src/readYaml.js');
const meow = require('meow');

describe('cli', () => {
  let cli;
  let mockMeow;
  let config;
  beforeEach(() => {
    cli = proxyquire('../src/cli.js', { meow: () => mockMeow });
    config = readYAML('test/hia.yaml');
  });

  afterEach(() => {
    Object.keys(meow).forEach(key => {
      meow[key].reset();
    });
  });

  describe('execute with -h option', () => {
    before(() => {
      mockMeow = {
        input: [ 'test:view', 'input' ],
        flags: { h: true },
        showHelp: sinon.stub()
      };
    });
    it('shows help', () => {
      cli(config);
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
      cli(config);
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
      cli(config);
      assert.equal(mockMeow.showHelp.callCount, 0);
    });
  });
});
