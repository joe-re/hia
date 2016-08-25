const getScriptPath = require('./getScriptPath');

function execute(config, subcommand, name) {
  const options = config.subcommands[subcommand];
  const scriptPath = getScriptPath(config.basedir, options.script);
  const script = require(scriptPath);
  const args = Object.assign({}, options.args, { name });
  return script(Object.assign({}, options, { args }));
};

module.exports = execute;
