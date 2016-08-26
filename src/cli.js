const meow = require('meow');

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
    Object.keys(subcommand.args).forEach(argName => {
      p.push(createArgRow(argName, subcommand.args[argName]));
    });
    p.push([]); // empty line for separate bwtween subcommands
    return p;
  }, [
    [ 'Usage:' ],
    [ `  ${command} <SUBCOMMAND> <INPUT>` ],
    [ '    -h, --help', 'Show list available subcommands and some concept guides.' ],
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

function cli(config) {
  const m = meow(createUsage(config.command, config.subcommands));
  if (needToShowHelp(config, m)) {
    m.showHelp();
    return;
  }
  return m;
}

module.exports = cli;
