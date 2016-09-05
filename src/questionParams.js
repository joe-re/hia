// @flow

import prompt from 'prompt';
import getScriptPath from './getScriptPath';
import filterByProperty from './filterByProperty';
import Config from './Config';
import type { CliParams } from './types/CliParams';

function rejectParams(params, rejectKeys) {
  return Object.keys(params).reduce((p, key) => {
    if (rejectKeys.includes(key)) {
      return p;
    }
    p[key] = params[key];
    return p;
  }, {});
}

function filterQuestionParams(basedir, params) {
  return {
    description: params.description,
    type: params.type,
    pattern: params.pattern,
    message: params.message,
    hidden: params.hidden,
    replace: params.replace,
    default: params.default,
    required: params.required,
    before: params.before && require(getScriptPath(basedir, params.before))
  };
}

function createQuestionSchema(basedir, params) {
  return { properties: Object.keys(params).reduce((p, key) => {
    p[key] = filterQuestionParams(basedir, params[key]);
    return p;
  }, {}) };
};

function questionParams(config: Config, cliParam: CliParams) {
  const subcommand = config.subcommands[cliParam.subcommand];
  const questions = rejectParams(
    filterByProperty(subcommand.args || {}, 'question', true),
    Object.keys(cliParam.args).filter(key => cliParam.args[key] !== null)
  );
  if (Object.keys(questions).length === 0) {
    return Promise.resolve(cliParam.args);
  }
  const questionSchema = createQuestionSchema(config.basedir, questions);
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(questionSchema, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.assign({}, cliParam.args, result));
      }
    });
  });
}

module.exports = questionParams;
