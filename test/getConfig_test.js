const assert = require('power-assert');
const proxyquire = require('proxyquire');
const getConfig = require('../src/getConfig');
const sinon = require('sinon');

describe('getConfig', () => {
  describe('specify config file path', () => {
    describe('file is not found', () => {
      it('receives error', () => {
        assert.throws(getConfig.bind(null, './config.yml'), (error) => {
          assert.equal(error.message, "ENOENT: no such file or directory, open './config.yml'");
          return true;
        });
      });
    });

    describe('file is found', () => {
      it('receives config', () => {
        assert.equal(getConfig('./test/hia.yaml').basedir, './test');
      });
    });
  });

  describe("doesn't specify config file path", () => {
    let proxiedReadConfig;
    let fs = null;
    let readAndParseConfig = null;
    beforeEach(() => {
      readAndParseConfig = sinon.stub();
      fs = { accessSync: sinon.stub().throws('cannot find file') };
      proxiedReadConfig = proxyquire('../src/getConfig.js', { fs, './readAndParseConfig': readAndParseConfig });
    });

    describe('hia.json is.', () => {
      it('reads hia.json.', () => {
        fs.accessSync.withArgs('./hia.json').returns(true);
        proxiedReadConfig();
        assert(readAndParseConfig.calledWith('./hia.json'));
      });
    });

    describe('hia.yaml is.', () => {
      it('reads hia.yaml.', () => {
        fs.accessSync.withArgs('./hia.yaml').returns(true);
        proxiedReadConfig();
        assert(readAndParseConfig.calledWith('./hia.yaml'));
      });
    });

    describe('finds hia.yml is.', () => {
      it('reads hia.yml.', () => {
        fs.accessSync.withArgs('./hia.yml').returns(true);
        proxiedReadConfig();
        assert(readAndParseConfig.calledWith('./hia.yml'));
      });
    });

    describe("config file isn't.", () => {
      it('receives error', () => {
        assert.throws(getConfig.bind(null), (error) => {
          assert.equal(error.message, 'Please create hia.yaml or hia.json on your project root.');
          return true;
        });
      });
    });
  });
});
