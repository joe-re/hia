// @flow

import path from 'path';

function getScriptPath(basedir: string, scriptPath: string) {
  return path.isAbsolute(scriptPath) ?
    scriptPath : `${process.cwd()}/${basedir || ''}/${scriptPath}`;
}

module.exports = getScriptPath;
