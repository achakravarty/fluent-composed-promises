function FluentIterable(iterableFunctions) {
  function* getFunctions() {
    for (let i = 0; i < iterableFunctions.length; i += 1) {
      yield iterableFunctions[i];
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

export default FluentIterable;
