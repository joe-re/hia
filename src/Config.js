// @flow

import fs from 'fs';
import jsyaml from 'js-yaml';

type Subcommand = {
  description?: string,
  input?: boolean,
  templates?: Array<string>,
  script?: string,
  output?: { dir: string, filename: string },
  args?: { [key: string]: {
    aliase?: string,
    description?: string,
    default?: string
  }}
};

export default class Config {
  configFilePath: string;
  _config: Object;

  constructor(configFilePath: ?string) {
    this.configFilePath = configFilePath || '';
  }

  get basedir(): string {
    return this._config['basedir'] || './';
  }

  get command(): string {
    return this._config['command'] || '';
  }

  get subcommands(): { [key: string]: Subcommand } {
    return this._config['subcommands'] || {};
  }

  read() {
    if (this.configFilePath) {
      return this._readAndParseConfig(this.configFilePath);
    }
    for (const filePath of [ './hia.json', './hia.yaml', './hia.yml' ]) {
      let exists;
      try {
        fs.accessSync(filePath);
        exists = true;
      } catch(e) {
        exists = false;
      }
      if (exists) {
        return this._readAndParseConfig(filePath);
      }
    }
    throw new Error('Please create hia.yaml or hia.json on your project root.');
  }

  _readAndParseConfig(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf8');
    this._config = filePath.match(/\.ya?ml$/) ? jsyaml.load(data) : JSON.parse(data);
    return this._config;
  }
}
