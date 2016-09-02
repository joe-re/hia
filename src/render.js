const ejs = require('ejs');

function render(str, cliParams) {
  const data = Object.assign({}, cliParams.args, { input: cliParams.input });
  return ejs.render(str, data);
}

module.exports = render;
