const path = require('path');

function execute(config, command, subCommand) {
  const baseDir = config.baseDir || '';
  const options = config.commands[command];
  const scriptPath = path.relative(__dirname, `${process.cwd()}/${baseDir}/${options.script}`);
  const script = require(scriptPath);
  const args = Object.assign({}, options.args, { name: subCommand });
  return script(Object.assign({}, options, { args }));
};

module.exports = execute;
