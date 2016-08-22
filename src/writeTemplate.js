const fs = require('fs');
const mkdirp = require('mkdirp');
const colors = require('./colors');

function createOutputFilePath(templatePath, output) {
  let name = output.filename || templatePath.split('/').pop();
  name = name.replace('[name]', templatePath.split('/').pop().split('.')[0]);
  return `${output.dir}/${name}`;
}

function writeTemplate(template, templatePath, output) {
  const outputPath = createOutputFilePath(templatePath, output);
  mkdirp.sync(output.dir);
  fs.writeFileSync(outputPath, template);
  console.log(colors.success(`created ${outputPath}`));
}

module.exports = writeTemplate;

