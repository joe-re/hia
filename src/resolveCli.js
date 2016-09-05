// @flow

import 'babel-polyfill';
import Config from './Config';
import meow from 'meow';
import type { CliParams } from './types/CliParams';

function rightPad(str, len) {
  let pad = '';
  while (pad.length < len) {
    pad += ' ';
  }
  return (str + pad).substr(0, len);
}

function createCommandStr(command, subcommand, requireInput) {
  return `${command || ''} ${subcommand || ''} ${requireInput ? '<INPUT>' : ''}`;
}

function createArgRow(argName, params) {
  const first = '    ' + (params.aliase ? `-${params.aliase}, --${argName}` : `--${argName}`);
  const second = params.description || '';
  return [ first, second ];
}

function toTable(command, subcommands) {
  return Object.keys(subcommands).reduce((p, key) => {
    const subcommand = subcommands[key];
    p.push([ `  ${createCommandStr(command, key, subcommand.input)}`, subcommand.description || '' ]);
    Object.keys(subcommand.args || {}).forEach(argName => {
      p.push(createArgRow(argName, (subcommand.args || {})[argName]));
    });
    p.push([]); // empty line to separate bwtween subcommands
    return p;
  }, [
    [ 'Usage:' ],
    [ `  ${command} <SUBCOMMAND> <INPUT>` ],
    [ '    -h, --help', 'Show list available subcommands and some concept guides.' ],
    [ '    -c, --config', 'specify config file path.' ],
    [],
    [ 'Subcommands:' ]
  ]);
}

function toStr(table) {
  const leftSideLen = Math.max(...table.map(([ first, _second ]) => first ? first.length : 0)) + 1;
  return table.map(([ first, second ]) => {
    if (!first) {
      return '';
    }
    return rightPad(first, leftSideLen) + (second || '');
  }).join('\n');
}

function createUsage(command, subcommands) {
  const list = toTable(command, subcommands);
  return toStr(list);
}

function needToShowHelp(config, m) {
  if (!m.input) {
    return true;
  }
  return m.flags.h || m.flags.help || !(Object.keys(config.subcommands).indexOf(m.input[0]) >= 0);
}

function toCliParams(config, m) {
  const subcommandConfig = config.subcommands[m.input[0]];
  const args = Object.keys(subcommandConfig.args).reduce((p, argName) => {
    const argParams = subcommandConfig.args[argName];
    const argValue = m.flags[argName] || m.flags[argParams.aliase] || null;
    p[argName] = argValue;
    return p;
  }, {});
  const resolved = { subcommand: m.input[0], args, input: '' };
  if (subcommandConfig.input) {
    resolved.input = m.input[1];
  }
  return resolved;
}

function resolveCli(config: Config): ?CliParams {
  const m = meow(createUsage(config.command, config.subcommands), { aliase: { h: 'help' } });
  if (needToShowHelp(config, m)) {
    m.showHelp();
    return null;
  }
  return toCliParams(config, m);
}

module.exports = resolveCli;
