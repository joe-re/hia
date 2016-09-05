const assert = require('power-assert');
const executeScript = require('../src/executeScript.js');
import Config from '../src/Config.js';

describe('executeScript', () => {
  let config;
  before(() => {
    config = new Config('./test/hia.yaml').read();
  });

  it('receives exchanged options by script', () => {
    const result = executeScript(config, { subcommand: 'test:view', input: 'Test' });
    assert.equal(result.subcommand.output.dir, 'test/dist/exchanged');
    assert.equal(result.cliParams.input, 'TestExchanged');
  });
});
