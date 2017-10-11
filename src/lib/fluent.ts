class Fluent {
  isFluent: boolean = false;
  returnType: string;
  private wrappedFunction: (responses: Object, ...rest: Array<any>) => any;
  private mapResponsesToArgs: (responses: Object) => Object;

  constructor(
    functionToWrap: (responses: Object, ...rest: Array<any>) => any,
    mapResponsesToArgs: (responses: Object) => Object,
    returnType: string,
  ) {
    this.isFluent = true;
    this.returnType = returnType;
    this.wrappedFunction = functionToWrap;
    this.mapResponsesToArgs = mapResponsesToArgs || (res => res);
  }

  invoke(...args: Array<any>) {
    const [argumentsToPass, ...rest] = args;
    const response = this.wrappedFunction(this.mapResponsesToArgs(argumentsToPass), ...rest);
    return response;
  }
}

export default Fluent;
