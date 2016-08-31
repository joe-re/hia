module.exports = function script(params) {
  params.config.output.dir += '/exchanged';
  params.cli.input += 'Exchanged';
  return params;
};
