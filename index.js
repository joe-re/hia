const resolveCli = require('./src/resolveCli');
const getConfig = require('./src/getConfig');
const executeScript = require('./src/executeScript');

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
  // question
  const result = executeScript(config, cliParams);
  console.log(result);

  // TODO: load Template
  // TODO: render ejs
  // TODO: write Template
}

hia();

module.exports = hia;
