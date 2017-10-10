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

module.exports = FluentIterable;
