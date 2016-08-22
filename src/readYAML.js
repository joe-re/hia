const jsyaml = require('js-yaml');
const fs = require('fs');

function readYAML(path) {
  return jsyaml.load(fs.readFileSync(path));
}

module.exports = readYAML;
