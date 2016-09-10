# hia

Easy and customizable generator system for creating template.

It provides the following features:

- Create command and provide cli for your generating template.
- Setting by yaml or json.
- Execute script for setting binding template value.

## installation

Global

```sh
npm install -g hia
```

Local

```sh
npm install -D hia
```

## Getting start

### 1. Create hia.yaml or hia.json on your project root.

Example:
```yaml
---

command: hia
subcommands:
  component:
    description: generate view template.
    input: true
    templates:
      - name: component/Hello.jsx
        src: templates/component.ejs
    output:
      dir: src
    args:
      text:
        aliase: t
        description: text on your component.
        required: true
```

### 2. Create template.

Template is resolved as [ejs](http://ejs.co/).

- templates/component.ejs
```javascript
import React from 'react';

export default <%= input %> extends React.Component {
  render() {
    return (
      <div>
        <h1><%= input %> Component!</h1>
        <span><%= text %></span>
      </div>
    );
  }
}
```

### 3. Execute command

```sh
$ hia component -t 'Test Text!'
```

Then, created src/component/Hello.jsx on your project root.

src/component/Hello.jsx

```javscript
import React from 'react';

export default Test extends React.Component {
  render() {
    return (
      <div>
        <h1>Test Component!</h1>
        <span>Test Text!</span>
      </div>
    );
  }
}
```

## Configration

Example:
```yaml
---
basedir: ./test
command: hia
subcommands:
  test:view:
    description: generate view template.
    input: true
    templates:
      src: fixtures/component.ejs
    script:
      fixtures/scripts/test.js
    output:
      dir: test/dist
      filename: '[name].jsx'
    args:
      feature_name:
        aliase: f
        description: Feature name. It is used as second directory name.(If you specify calendar, create 'test/dist/calendar/[name].jsx')
      require_args:
        aliase: r
        description: require args.
        required: true
      question_args:
        aliase: q
        description: This is Question Section.
        before: fixtures/scripts/before.js
        question: true
      default_args:
        aliase: d
        description: set default value.
        default: 'default value'
```

### basedir

- basedir: string

The base directory for resolving filepaths.

Default: process.cwd()

### command

- command: string

Your generator system's command name.

### subcommands

- Array<Subcommand>
  - Subcommand: { [subcommandName: string]: Options }

Define your generator system's subcommands.  
subcommandName become subcommand for cli.

Example:
```yaml
command: hia
subcommands:
  view:
    description: generate view template.
    input: true
    ...
```

Usage
```sh
$ hia view hogeView
```

#### Options

##### description

- description: string

Description of your subcommand.
It is used for help message on cli.

##### input

- input: boolean

Set whether or not require value of input.

Default: false

##### templates

- templates: Array<{ src: string, name: string }>

src: template src of ejs.
name(optional): output src file path based on setting of basedir.

##### script

- script: string

Specify filepath of Node.js script.
It runs before rendering and writing templates.

Script Example:
```javascript
module.exports = function script(params) {
  params.subcommand.output.dir += '/exchanged';
  params.cliParams.input += 'Exchanged';
  return params;
};
```

It needs runnable on Node.js and must be exported as default.  
You can receive bellow parameter and can change included value freely.  
Returned value is applied for template rendering and writing.

- { subcommand: Object, cliParams: Object }
  - subcommand's value is one of the subcommands section on hia.yaml.Executed subcommand is selected.
  - cliParams is include below params.
    - subcommand: string
      - executed subcommand name
    - input: string
      - input by cli
    - args: { [argName: string]: string }
      - Options by cli

Example:
```sh
$ hia test:view Test --feature_name bar
```

```javascript
{
  subcommand: {
    description: 'generate view template.',
    input: true,
    templates: { src: 'fixtures/component.ejs' },
    script: 'fixtures/scripts/test.js',
    output: { dir: 'test/dist', filename: '[name].jsx' },
    args: { feature_name: [Object] }
  },
  cliParams: {
    subcommand: 'test:view',
    input: 'Test',
    args: { feature_name: 'bar' }
  }
}
```

##### output

- output(option): { dir(option): string, filename(option): string }

dir: Output directory. Default is basedir.

filename: output file. [name] is replaced by the name of the chunk.

##### args

- args: { [argName: string]: Options }
  - argName is used as flag by cli.
  - Options:
    - aliase(option): string
      - aliase name.
    - description(option): string
      - description.
    - default(option): string
      - default value.
    - required(option): boolean
      - Set whether or not require value of input.Default is false.
    - question(options): boolean
      - Set whether or not to be questioned when execute script.Default is false.
      - It uses [prompt](https://github.com/flatiron/prompt).So you can specify prompto's parameters.But if you want to use before parameter, you have to set script path instead of function object.

Example:
```yaml
---
subcommands:
  test:view:
    ...
    args:
      feature_name:
        aliase: f
        description: Feature name. It is used as second directory name.(If you specify calendar, create 'test/dist/calendar/[name].jsx')
      require_args:
        aliase: r
        description: require args.
        required: true
      question_args:
        aliase: q
        description: This is Question Section.
        before: fixtures/scripts/before.js
        question: true
      default_args:
        aliase: d
        description: set default value.
        default: 'default value'
    ...
```

## CLI

hia has default options.
- -h, --help: show help for your generate cli.
- -c, --config: specify configuration path.

```sh
$ hia-flux -h

  Easy and customizable generator system for creating template by cli.

  Usage:
    hia-flux <SUBCOMMAND> <INPUT>
      -h, --help                  Show list available subcommands and some concept guides.
```

## for node

You can require hia as function.

Example

```javascript
import 'babel-core/register';
import 'babel-polyfill';
import hia from 'hia';
hia({ basedir: __dirname + '/..', configPath: `${__dirname}/../hia.yml` });
```

Now you need require 'babel-core/register' and 'babel-polifill' to use it.

hia can be received below option.
- { basedir(option): string, configPath(option): string }
  - basedir: Your project's root. Default is process.cwd().
  - configPath: Configuration of hia's filepath.Defaul is hia.yaml(json) on your project root.

## License

MIT © joe-re
