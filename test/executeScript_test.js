const assert = require('power-assert');
const executeScript = require('../src/executeScript.js');
const read = require('../src/readAndParseConfig.js');

describe('executeScript', () => {
  let config;
  before(() => read('./test/hia.yaml').then(v => {
    config = v;
  }));

  it('receives exchanged options by script', () => {
    const result = executeScript(config, 'test:view', 'Test');
    assert.equal(result.output.dir, 'test/dist/exchanged');
    assert.equal(result.args.name, 'TestExchanged');
  });
});
