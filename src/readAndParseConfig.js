const fs = require('fs');
const jsyaml = require('js-yaml');

function readAndParseConfig(configFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(configFilePath, (err, data) => {
      if (err) {
        reject(err.message);
      }
      if (configFilePath.match(/\.ya?ml$/)) {
        resolve(jsyaml.load(data));
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

module.exports = readAndParseConfig;
