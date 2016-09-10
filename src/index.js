// @flow
import Config from './Config';
import resolveCli from './resolveCli';
import executeScript from './executeScript';
import questionParams from './questionParams';
import readTemplate from './readTemplate';
import reder from './render';
import writeTemplate from './writeTemplate';
import colors from './colors';
import validateArgs from './validateArgs';

type Params = { basedir?: string, configPath?: string };
function getArgFromCli(paramName) {
  const index = process.argv.indexOf(paramName);
  if (index < 0) {
    return null;
  }
  return process.argv[index + 1];
}

async function hia(params: Params) {
  let receiveConfig = !!params.configPath;
  const configPath = params.configPath || getArgFromCli('-c') || getArgFromCli('--config');
  const config = new Config(configPath);
  config.read();
  let cliParams = resolveCli(config, receiveConfig);
  if (!cliParams) {
    return;
  }
  cliParams.args = await questionParams(config, cliParams);
  if (params.basedir) {
    config.basedir = params.basedir;
  }
  const result = executeScript(config, cliParams);
  const { subcommand } = result;
  cliParams = result.cliParams;
  validateArgs(cliParams.args, subcommand.args || {});
  if (!subcommand.templates) {
    return;
  }
  subcommand.templates.forEach(template => {
    const content = reder(readTemplate(config.basedir, template.src), cliParams);
    writeTemplate(content, template, subcommand.output, config.basedir);
  });
}

export default function(params: Params) {
  hia(params || {}).catch(e => console.log(colors.error(e.stack)));
}
