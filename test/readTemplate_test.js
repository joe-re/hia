const assert = require('power-assert');
const readTemplate = require('../src/readTemplate.js');

describe('readTemplate', () => {
  describe('exist file', () => {
    it('can read template', () => {
      const template = readTemplate('test/fixtures/component.ejs');
      assert(template);
    });
  });

  describe('not exist target', () => {
    it('causes file open error', () => {
      assert.throws(readTemplate.bind(null, 'aaaaa'), (error) => {
        assert.equal(error.message, "ENOENT: no such file or directory, open 'aaaaa'");
        return true;
      });
    });
  });
});
