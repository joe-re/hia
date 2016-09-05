// @flow

export type CliParams = {
  subcommand: string,
  args: { [key: string]: any },
  input: string
};
