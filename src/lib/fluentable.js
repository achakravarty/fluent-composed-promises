const Fluent = require('./fluent');

const fluentable = (mapResponsesToArgs, returnType) => fn =>
  new Fluent(fn, mapResponsesToArgs, returnType);

module.exports = fluentable;
