function Fluent(fn, mapResponsesToArgs, returnType) {
  this.isFluent = true;
  this.returnType = returnType;
  this.execute = (...args) => {
    const [argumentsToPass, ...rest] = args;
    const response = fn((mapResponsesToArgs || (res => res))(argumentsToPass), ...rest);
    return response;
  };
}

function FluentIterable(fnArray) {
  function* getFunctions() {
    for (let i = 0; i < fnArray.length; i += 1) {
      yield fnArray[i];
    }
  }
  const functions = getFunctions();
  this.reduce = (reducer, accumulator) => {
    const nextFunction = functions.next();
    if (nextFunction.done) {
      return Promise.resolve(accumulator);
    }
    return reducer(nextFunction.value, accumulator).then(res => this.reduce(reducer, res));
  };
}

const fluentable = (mapResponsesToArgs, returnType) => fn =>
  new Fluent(fn, mapResponsesToArgs, returnType);

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

module.exports = {
  Fluent,
  fluentable,
  compose,
};
