const fs = require('fs');
const mkdirp = require('mkdirp');
const colors = require('./colors');
const getScriptPath = require('./getScriptPath');
const path = require('path');

function createOutputFilePath(templatePath, output, basedir) {
  let name = output.filename || templatePath.split('/').pop();
  name = name.replace('[name]', templatePath.split('/').pop().split('.')[0]);
  const outputPath = path.relative(process.cwd(), getScriptPath(basedir, `${output.dir}/${name}`));
  return outputPath;
}

function writeTemplate(template, templatePath, output, basedir) {
  const outputPath = createOutputFilePath(templatePath, output, basedir);
  mkdirp.sync(path.parse(outputPath).dir);
  fs.writeFileSync(outputPath, template);
  console.log(colors.success(`created ${outputPath}`));
}

module.exports = writeTemplate;
