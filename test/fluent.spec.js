const { expect } = require('chai');
const { fluentable, compose } = require('../src/fluent');

describe('Fluent Spec', () => {
  it('should be able to chain functions', async () => {
    const fna = () => 'a';
    const fnb = () => 'b';
    const res = await compose(fna, fnb);
    expect(res).to.eql({ fna: 'a', fnb: 'b' });
  });

  it('should be able to pass responses to functions', async () => {
    const fna = () => 'a';
    const fnb = ({ fna }) => `${fna}-b`;
    const res = await compose(fna, fnb);
    expect(res).to.eql({ fna: 'a', fnb: 'a-b' });
  });

  it('should be able to handle promises', async () => {
    const fna = () => 'a';
    const fnb = ({ fna }) => new Promise(resolve => resolve(`${fna}-b`));
    const res = await compose(fna, fnb);
    expect(res).to.eql({ fna: 'a', fnb: 'a-b' });
  });
});

describe('Fluent Compose Spec', () => {
  it('should be able to map response to args', async () => {
    const fna = () => 'a';
    const fnb = () => 'b';

    const innerFn = ({ aRes, bRes }) => `${aRes}-${bRes}-c`;

    const mapResponsesToArgs = responses => ({
      aRes: responses.fna,
      bRes: responses.fnb,
    });

    const fnc = fluentable(mapResponsesToArgs, 'fnc')(innerFn);

    const res = await compose(fna, fnb, fnc);
    expect(res).to.eql({ fna: 'a', fnb: 'b', fnc: 'a-b-c' });
  });
});
