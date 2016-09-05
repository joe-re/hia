// @flow

const fs = require('fs');
const getScriptPath = require('./getScriptPath');

function readTemplate(basedir: string, path: string) {
  return fs.readFileSync(getScriptPath(basedir, path), 'utf8');
}

module.exports = readTemplate;
