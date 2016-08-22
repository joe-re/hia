const assert = require('power-assert');
const executeScript = require('../src/executeScript.js');
const readYAML = require('../src/readYaml.js');

describe('executeScript', () => {
  let config;
  before(() => {
    config = readYAML('test/hia.yaml');
  });

  it('receives exchanged options by script', () => {
    const result = executeScript(config, 'test:view', 'Test');
    assert.equal(result.output.dir, 'src/view/exchanged');
    assert.equal(result.args.name, 'TestExchanged');
  });
});
