import fs from 'fs';
import mkdirp from 'mkdirp';
import colors from './colors';
import getScriptPath from './getScriptPath';
import path from 'path';

function createOutputFilePath(templatePath, output, basedir) {
  let name = output.filename || templatePath.split('/').pop();
  name = name.replace('[name]', templatePath.split('/').pop().split('.')[0]);
  const outputPath = path.relative(process.cwd(), getScriptPath(basedir, `${output.dir}/${name}`));
  return outputPath;
}

function writeTemplate(template: string, templatePath: string, output: string, basedir: string) {
  const outputPath = createOutputFilePath(templatePath, output, basedir);
  mkdirp.sync(path.parse(outputPath).dir);
  fs.writeFileSync(outputPath, template);
  console.log(colors.success(`created ${outputPath}`));
}

module.exports = writeTemplate;
