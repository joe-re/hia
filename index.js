const resolveCli = require('./src/resolveCli');
const getConfig = require('./src/getConfig');
const executeScript = require('./src/executeScript');
const questionParams = require('./src/questionParams');
const readTemplate = require('./src/readTemplate');
const reder = require('./src/render');

function getArgFromCli(paramName) {
  const index = process.argv.indexOf(paramName);
  if (index < 0) {
    return null;
  }
  return process.argv[index + 1];
}

function hia() {
  const configPath = getArgFromCli('-c') || getArgFromCli('--config');
  const config = getConfig(configPath);
  const cliParams = resolveCli(config);
  questionParams(config, cliParams).then(args => {
    cliParams.args = args;
    const result = executeScript(config, cliParams);
    console.log(result.config);
    result.config.templates.forEach(path => {
      const template = reder(readTemplate(config.basedir, path), result.cli);
      console.log(template);
    });
  });

  // TODO: load Template
  // TODO: render ejs
  // TODO: write Template
}

hia();

module.exports = hia;
