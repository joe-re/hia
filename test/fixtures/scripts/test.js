module.exports = function script(params) {
  params.subcommand.output.dir += '/exchanged';
  params.cliParams.input += 'Exchanged';
  return params;
};
