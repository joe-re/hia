// @flow

import getScriptPath from './getScriptPath';
import Config from './Config';
import type { CliParams } from './types/CliParams';

function execute(config: Config, cliParams: CliParams) {
  const subcommand = config.subcommands[cliParams.subcommand];
  const scriptPath = subcommand.script ? getScriptPath(config.basedir, subcommand.script) : '';
  const script = scriptPath ? require(scriptPath): (val) => val;
  return script({ subcommand, cliParams });
};

module.exports = execute;
