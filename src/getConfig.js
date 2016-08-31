const fs = require('fs');
const readAndParseConfig = require('./readAndParseConfig');

function getConfig(configFilePath) {
  if (configFilePath) {
    return readAndParseConfig(configFilePath);
  }
  for (const filePath of [ './hia.json', './hia.yaml', './hia.yml' ]) {
    let exists;
    try {
      fs.accessSync(filePath);
      exists = true;
    } catch(e) {
      exists = false;
    }
    if (exists) {
      return readAndParseConfig(filePath);
    }
  }
  throw new Error('Please create hia.yaml or hia.json on your project root.');
}

module.exports = getConfig;
