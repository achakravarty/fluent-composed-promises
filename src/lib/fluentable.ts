import Fluent from './fluent';

const fluentable = (mapResponsesToArgs: (responses: object) => object, returnType: string) => (
  innerFunction: (args: any) => any,
) => new Fluent(innerFunction, mapResponsesToArgs, returnType);

export default fluentable;
