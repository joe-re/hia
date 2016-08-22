const ejs = require('ejs');

function render(str, data) {
  return ejs.render(str, data);
}

module.exports = render;
