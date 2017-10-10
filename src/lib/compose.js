const Fluent = require('./fluent');
const FluentIterable = require('./fluentIterable');

const compose = (...args) => {
  const iterable = new FluentIterable(args);
  return iterable
    .reduce((fn, acc) => {
      let fnToExecute;
      if (!fn.isFluent) {
        fnToExecute = new Fluent(fn, null, fn.name);
      } else {
        fnToExecute = fn;
      }
      return Promise.resolve(fnToExecute.execute(acc)).then((result) => {
        const values = { ...acc };
        values[fnToExecute.returnType] = result;
        return values;
      });
    }, {})
    .then(res => res)
    .catch(err => err);
};

module.exports = compose;
