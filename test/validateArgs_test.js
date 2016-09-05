const assert = require('power-assert');
const validateArgs = require('../src/validateArgs.js');

describe('validateArgs', () => {
  describe('has required params', () => {
    const argParams = {
      required_args: { required: true },
      not_required_args: { required: false }
    };
    describe('required arg is reveived', () => {
      it('is valid', () => {
        assert(validateArgs({ required_args: 'ok' }, argParams));
      });
    });
    describe('required arg is empty', () => {
      it('is invalid', () => {
        assert(!validateArgs({ }, argParams));
      });
    });
  });
});
