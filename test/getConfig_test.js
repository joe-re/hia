const assert = require('power-assert');
const proxyquire = require('proxyquire');
const getConfig = require('../src/getConfig');
const sinon = require('sinon');

describe('getConfig', () => {
  describe('specify config file path', () => {
    describe('file is not found', () => {
      it('receives error', () => {
        return getConfig('./config.yml').catch((error) => {
          assert.equal(error, "ENOENT: no such file or directory, open './config.yml'");
        });
      });
    });
    describe('file is found', () => {
      it('receives config', () => {
        return getConfig('./test/hia.yaml').then((config) => {
          assert.equal(config.basedir, './test');
        });
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
        return getConfig().catch((error) => {
          assert.equal(error, 'Please create hia.yaml or hia.json on your project root.');
        });
      });
    });
  });
});
