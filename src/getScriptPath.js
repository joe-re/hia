const path = require('path');

function getScriptPath(basedir, scriptPath) {
  return path.isAbsolute(scriptPath) ?
    scriptPath : `${process.cwd()}/${basedir || ''}/${scriptPath}`;
}

module.exports = getScriptPath;
