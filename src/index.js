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

export default async function hia() {
  const configPath = getArgFromCli('-c') || getArgFromCli('--config');
  const config = new Config(configPath);
  config.read();
  let cliParams = resolveCli(config);
  if (!cliParams) {
    return;
  }
  cliParams.args = await questionParams(config, cliParams);
  const result = executeScript(config, cliParams);
  const { subcommand } = result;
  cliParams = result.cliParams;
  if (!subcommand.templates) {
    return;
  }
  subcommand.templates.forEach(template => {
    const content = reder(readTemplate(config.basedir, template.src), cliParams);
    writeTemplate(content, template, subcommand.output, config.basedir);
  });
}
