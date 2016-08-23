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

function createQuestionSchema(params) {
  return Object.keys(params).reduce((p, key) => {
    p[key] = {
      message: params.described || key,
      required: !!params.required
    };
    return p;
  }, {});
};

function argsResolve(receivedArgs, argParams) {
  const questions = reject(filterByPropertyName(argParams, 'question'), Object.keys(receivedArgs));
  const questionSchema = createQuestionSchema(questions);
  console.log(questionSchema);
}

module.exports = argsResolve;
