// @flow

import ejs from 'ejs';
import type { CliParams } from './types/CliParams';

function render(str: string, cliParams: ?CliParams) {
  const data = cliParams ? Object.assign({}, cliParams.args, { input: cliParams.input }) : {};
  return ejs.render(str, data);
}

module.exports = render;
