// @flow

function filterByProperty(params: Object, propertyName: string, value: any) {
  return Object.keys(params).reduce((p, key) => {
    const param = params[key];
    if (param[propertyName] === value) {
      p[key] = param;
    }
    return p;
  }, {});
}

module.exports = filterByProperty;
