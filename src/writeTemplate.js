// @flow

import fs from 'fs';
import mkdirp from 'mkdirp';
import colors from './colors';
import path from 'path';
import type { Template, Output } from './Config';

function createOutputFilePath(template, output, args={}) {
  let name = template.name || path.parse(template.src).base;
  Object.keys(args).forEach(key => {
    name = name.replace(`[${key}]`, args[key]);
  });
  if (output && output.filename) {
    name = output.filename.replace('[name]', name);
  }
  const file = (output && output.dir) ? `${output.dir}/${name}` : name;
  const outputPath = path.relative(process.cwd(), file);
  return outputPath;
}

type Params = {
  content: string,
  template: Template,
  output?: Output,
  args?: { [key: string] : string }
};

function writeTemplate(params: Params) {
  const outputPath = createOutputFilePath(params.template, params.output, params.args);
  mkdirp.sync(path.parse(outputPath).dir);
  fs.writeFileSync(outputPath, params.content);
  console.log(colors.success(`created ${outputPath}`));
}

module.exports = writeTemplate;
