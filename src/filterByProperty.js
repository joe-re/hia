function filterByProperty(params, propertyName, value) {
  return Object.keys(params).reduce((p, key) => {
    const param = params[key];
    if (param[propertyName] === value) {
      p[key] = param;
    }
    return p;
  }, {});
}

module.exports = filterByProperty;
