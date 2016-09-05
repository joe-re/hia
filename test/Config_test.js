import assert from 'power-assert';
import proxyquire from 'proxyquire';
import Config from '../src/Config';
import sinon  from 'sinon';

describe('Config', () => {
  describe('#read', () => {
    let config;
    let filePath;
    beforeEach(() => {
      config = new Config(filePath);
    });
    describe('file is not found', () => {
      before(() => {
        filePath = './not_found.yml';
      });
      it('receives error', () => {
        assert.throws(config.read.bind(config), (error) => {
          assert.equal(error.message, "ENOENT: no such file or directory, open './not_found.yml'");
          return true;
        });
      });
    });

    describe('file is found', () => {
      before(() => {
        filePath = './test/hia.yaml';
      });
      it('receives config', () => {
        assert.equal(config.read('./test/hia.yaml').basedir, './test');
      });
    });

    describe("doesn't specify config file path", () => {
      let proxiedConfig;
      let fs = null;
      let jsyaml = null;
      beforeEach(() => {
        jsyaml = { load: sinon.stub() };
        fs = {
          accessSync: sinon.stub().throws('cannot find file'),
          readFileSync: () => '{"hoge": "hoge"}'
        };
        const Config = proxyquire('../src/Config.js', { fs, 'js-yaml': jsyaml }).default;
        proxiedConfig = new Config();
      });

      describe('hia.json is.', () => {
        it('reads hia.json.', () => {
          fs.accessSync.withArgs('./hia.json').returns(true);
          assert.equal(proxiedConfig.read().hoge, 'hoge');
        });
      });

      describe('hia.yaml is.', () => {
        it('reads hia.yaml.', () => {
          fs.accessSync.withArgs('./hia.yaml').returns(true);
          proxiedConfig.read();
          assert(jsyaml.load.calledWith('{"hoge": "hoge"}'));
        });
      });

      describe('hia.yml is.', () => {
        it('reads hia.yaml.', () => {
          fs.accessSync.withArgs('./hia.yml').returns(true);
          proxiedConfig.read();
          assert(jsyaml.load.calledWith('{"hoge": "hoge"}'));
        });
      });

      describe("config file isn't.", () => {
        it('receives error', () => {
          assert.throws(proxiedConfig.read.bind(proxiedConfig), (error) => {
            assert.equal(error.message, 'Please create hia.yaml or hia.json on your project root.');
            return true;
          });
        });
      });
    });
  });
});
