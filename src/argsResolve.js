const prompt = require('prompt');
const getScriptPath = require('./getScriptPath');

function filterByPropertyName(params, propertyName) {
  return Object.keys(params).reduce((p, key) => {
    const param = params[key];
    if (param[propertyName]) {
      p[key] = param;
    }
    return p;
  }, {});
}

function reject(params, rejectKeys) {
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

function argsResolve(basedir, receivedArgs, argParams) {
  const questions = reject(filterByPropertyName(argParams, 'question'), Object.keys(receivedArgs));
  const questionSchema = createQuestionSchema(basedir, questions);
  prompt.start();
  prompt.get(questionSchema, (err, result) => {
    console.log(err);
    console.log(result);
  });
}

module.exports = argsResolve;
