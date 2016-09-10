// @flow

import fs from 'fs';
import jsyaml from 'js-yaml';
import path from 'path';

export type Template = {
  name?: string,
  src: string
}

export type Output = {
  dir?: string,
  filename?: string
}

export type Args = {
  [key: string]: {
    aliase?: string,
    description?: string,
    default?: string
  }
};

type Subcommand = {
  description?: string,
  input?: boolean,
  templates?: Array<Template>,
  script?: string,
  output?: Output,
  args?: Args
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

  set basedir(dir: string) {
    this._config['basedir'] = path.isAbsolute(dir) ? path.relative(process.cwd(), dir) : dir;
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
