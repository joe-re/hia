const getScriptPath = require('./getScriptPath');

function execute(config, command, subCommand) {
  const options = config.commands[command];
  const scriptPath = getScriptPath(config.basedir, options.script);
  const script = require(scriptPath);
  const args = Object.assign({}, options.args, { name: subCommand });
  return script(Object.assign({}, options, { args }));
};

module.exports = execute;
