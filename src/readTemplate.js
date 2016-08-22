const fs = require('fs');

function readTemplate(path) {
  return fs.readFileSync(path);
}

module.exports = readTemplate;
