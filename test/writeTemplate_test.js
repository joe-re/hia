const assert = require('power-assert');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('writeTemplate', () => {
  let writeTemplate;
  let mkdirp;
  let writeFileSync;
  const template = '<h1>Hello</H1>';
  beforeEach(() => {
    mkdirp = sinon.spy();
    writeFileSync = sinon.spy();
    writeTemplate = proxyquire('../src/writeTemplate.js', {
      'mkdirp': { sync: mkdirp },
      'fs': { writeFileSync }
    });
  });

  afterEach(() => {
    mkdirp.reset();
    writeFileSync.reset();
  });

  describe('specify output.name', () => {
    it('uses output.name for output filename.', () => {
      writeTemplate(template, 'fixtures/component.js', { dir: 'test/sandbox', filename: 'SampleFile.js' });
      assert(mkdirp.calledOnce);
      assert.equal(mkdirp.getCall(0).args[0], 'test/sandbox');
      assert(writeFileSync.calledOnce);
      assert.equal(writeFileSync.getCall(0).args[0], 'test/sandbox/SampleFile.js');
      assert.equal(writeFileSync.getCall(0).args[1], template);
    });
  });

  describe("doesn't specify output.name", () => {
    it('uses template name for output filename.', () => {
      writeTemplate(template, 'fixtures/component.js', { dir: 'test/sandbox' });
      assert(mkdirp.calledOnce);
      assert.equal(mkdirp.getCall(0).args[0], 'test/sandbox');
      assert(writeFileSync.calledOnce);
      assert.equal(writeFileSync.getCall(0).args[0], 'test/sandbox/component.js');
      assert.equal(writeFileSync.getCall(0).args[1], template);
    });
  });

  describe('include [name]', () => {
    it('replaces [name] with filename.', () => {
      writeTemplate(template, 'fixtures/component.js', { dir: 'test/sandbox', filename: 'dist/[name].erb' });
      assert(mkdirp.calledOnce);
      assert.equal(mkdirp.getCall(0).args[0], 'test/sandbox');
      assert(writeFileSync.calledOnce);
      assert.equal(writeFileSync.getCall(0).args[0], 'test/sandbox/dist/component.erb');
      assert.equal(writeFileSync.getCall(0).args[1], template);
    });
  });
});