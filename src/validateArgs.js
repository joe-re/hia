// @flow
import filterByProperty from './filterByProperty';
import colors from './colors';
import type { Args } from './Config';

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

function validateArgs(args: {[key:string]: any}, argParams: Args) {
  return validateRequired(args, argParams);
}

module.exports = validateArgs;
