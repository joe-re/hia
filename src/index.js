// @flow

import Config from './Config';
const resolveCli = require('./resolveCli');
const executeScript = require('./executeScript');
const questionParams = require('./questionParams');
const readTemplate = require('./readTemplate');
const reder = require('./render');
const writeTemplate = require('./writeTemplate');

function getArgFromCli(paramName) {
  const index = process.argv.indexOf(paramName);
  if (index < 0) {
    return null;
  }
  return process.argv[index + 1];
}

function hia() {
  const configPath = getArgFromCli('-c') || getArgFromCli('--config');
  const config = new Config(configPath).read();
  const cliParams = resolveCli(config);
  questionParams(config, cliParams).then(args => {
    cliParams.args = args;
    const result = executeScript(config, cliParams);
    result.config.templates.forEach(path => {
      console.log(config.basedir);
      const template = reder(readTemplate(config.basedir, path), result.cli);
      writeTemplate(template, path, result.config.output, config.basedir);
    });
  });
}

hia();

module.exports = hia;
