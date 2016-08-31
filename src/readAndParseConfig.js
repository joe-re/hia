const fs = require('fs');
const jsyaml = require('js-yaml');

function readAndParseConfig(configFilePath) {
  const data = fs.readFileSync(configFilePath);
  return configFilePath.match(/\.ya?ml$/) ? jsyaml.load(data) : JSON.parse(data);
}

module.exports = readAndParseConfig;
