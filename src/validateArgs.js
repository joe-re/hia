const filterByProperty = require('./filterByProperty');
const colors = require('./colors');

function validateRequired(args, argParams) {
  const requiredParams = filterByProperty(argParams, 'required', true);
  const invalids = Object.keys(requiredParams).filter(key =>
    args[key] === '' || args[key] === null || args[key] === undefined
  );
  if (invalids.length > 0) {
    invalids.forEach((paramName) => {
      console.log(colors.error(`Error: ${paramName} is required.`));
    });
    return false;
  }
  return true;
}

function validateArgs(args, argParams) {
  return validateRequired(args, argParams);
}

module.exports = validateArgs;
