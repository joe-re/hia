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

function createUsageLite(command, subcommands) {
  console.log(process.pkg);
  const descPos =
    Math.max(
      ...Object.keys(subcommands).map(v => createCommandStr(command, v, subcommands[v].input)).map(v => v.length)
    ) + 3;
  const list = Object.keys(subcommands).reduce((p, key) => {
    const str = `${rightPad(createCommandStr(command, key, subcommands[key].input), descPos)} ${subcommands[key].description || ''}`;
    p.push(str);
    return p;
  }, [ 'Usage:' ]);
  console.log(list);
  return list.join('\n');
}

function cli(settings) {
  const m = meow(createUsageLite(settings.command, settings.subcommands));
  m.showHelp();
  console.log(m.input);
  console.log(m.flags);
}

module.exports = cli;
