const path = require('path');

function getScriptPath(basedir, scriptPath) {
  return path.relative(__dirname, `${process.cwd()}/${basedir || ''}/${scriptPath}`);
}

module.exports = getScriptPath;
