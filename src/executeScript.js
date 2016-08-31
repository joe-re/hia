const getScriptPath = require('./getScriptPath');

function execute(config, cliParams) {
  const subcommandConfig = config.subcommands[cliParams.subcommand];
  const scriptPath = getScriptPath(config.basedir, subcommandConfig.script);
  const script = require(scriptPath);
  return script({ config: subcommandConfig, cli: cliParams });
};

module.exports = execute;
