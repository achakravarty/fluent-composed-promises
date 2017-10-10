function Fluent(fn, mapResponsesToArgs, returnType) {
  this.isFluent = true;
  this.returnType = returnType;
  this.execute = (...args) => {
    const [argumentsToPass, ...rest] = args;
    const response = fn((mapResponsesToArgs || (res => res))(argumentsToPass), ...rest);
    return response;
  };
}

module.exports = Fluent;
