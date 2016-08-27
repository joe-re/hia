const prompt = require('prompt');
const getScriptPath = require('./getScriptPath');
const filterByProperty = require('./filterByProperty');

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

function questionParams(basedir, receivedArgs, argParams) {
  const questions = rejectParams(filterByProperty(argParams, 'question', true), Object.keys(receivedArgs));
  if (Object.keys(questions).length === 0) {
    return Promise.resolve({});
  }
  const questionSchema = createQuestionSchema(basedir, questions);
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(questionSchema, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
    if (process.env.NODE_ENV === 'test') { // for handling test example
      resolve();
    }
  });
}

module.exports = questionParams;
