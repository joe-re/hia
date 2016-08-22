const assert = require('power-assert');
const readYAML = require('../src/readYaml.js');

describe('readYAML', () => {
  describe('exist target', () => {
    it('can read yaml file', () => {
      const json = readYAML('test/hia.yaml');
      assert(json.commands['test:view']);
    });
  });

  describe('not exist target', () => {
    it('causes file open error', () => {
      assert.throws(readYAML.bind(null, 'aaaaa'), (error) => {
        assert.equal(error.message, "ENOENT: no such file or directory, open 'aaaaa'");
        return true;
      });
    });
  });
});
