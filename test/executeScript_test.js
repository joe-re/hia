const assert = require('power-assert');
const executeScript = require('../src/executeScript.js');
const read = require('../src/readAndParseConfig.js');

describe('executeScript', () => {
  let config;
  before(() => {
    config = read('./test/hia.yaml');
  });

  it('receives exchanged options by script', () => {
    const result = executeScript(config, { subcommand: 'test:view', input: 'Test' });
    assert.equal(result.config.output.dir, 'test/dist/exchanged');
    assert.equal(result.cli.input, 'TestExchanged');
  });
});
