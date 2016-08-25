const readYAML = require('./src/readYAML');
const argsResolve = require('./src/argsResolve');

function hia() {
  const yaml = readYAML('./test/hia.yaml');
  argsResolve(yaml.basedir, {}, yaml.commands['test:view'].args);

  // TODO: YAML or JSON Load
  // TODO: script execute
  // TODO: load Template
  // TODO: render ejs
  // TODO: write Template
}
hia();

module.exports = hia;
