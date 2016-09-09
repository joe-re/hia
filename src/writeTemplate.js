// @flow

import fs from 'fs';
import mkdirp from 'mkdirp';
import colors from './colors';
import getScriptPath from './getScriptPath';
import path from 'path';
import type { Template, Output } from './Config';

function createOutputFilePath(template, output, basedir) {
  let name = template.name || path.parse(template.src).name;
  if (output && output.filename) {
    name = output.filename.replace('[name]', name);
  } else {
    name += path.parse(template.src).ext;
  }
  const file = (output && output.dir) ? `${output.dir}/${name}` : name;
  const outputPath = path.relative(process.cwd(), getScriptPath(basedir, file));
  return outputPath;
}

function writeTemplate(content: string, template: Template, output?: Output, basedir: string) {
  const outputPath = createOutputFilePath(template, output, basedir);
  mkdirp.sync(path.parse(outputPath).dir);
  fs.writeFileSync(outputPath, content);
  console.log(colors.success(`created ${outputPath}`));
}

module.exports = writeTemplate;
