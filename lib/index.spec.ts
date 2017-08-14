import { expect } from 'chai';
import Url from './index'

describe('Url', () => {
  it('should be able to parse url', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';

    const url = new Url(input);
    expect(url.toString()).to.be.equal(output);
  });

  it('should be able to extract schema', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = 'https://';

    const url = new Url(input);
    expect(url.schema).to.be.equal(output);
  });

  it('should be able to extract hostname', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = 'www.trendsales.dk';

    const url = new Url(input);
    expect(url.hostname).to.be.equal(output);
  });

  it('should be able to extract path', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = '/hello/world';

    const url = new Url(input);
    expect(url.path).to.be.equal(output);
  });

  it('should be able to extract query string', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = '?foo=bar&bar=baz';

    const url = new Url(input);
    expect(url.queryString).to.be.equal(output);
  });

  it('should be able to extract path segments', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = ['hello', 'world'];

    const url = new Url(input);
    expect(url.pathSegments).to.be.eql(output);
  });

  it('should be able to extract query', () => {
    const input = 'https://www.trendsales.dk/hello/world?foo=bar&bar=baz';
    const output = {
      foo: 'bar',
      bar: 'baz',
    };

    const url = new Url(input);
    expect(url.query).to.be.eql(output);
  });

  it('should be able to extract url with only hostname', () => {
    const input = 'https://www.trendsales.dk';
    const output = 'https://www.trendsales.dk';

    const url = new Url(input);
    expect(url.toString()).to.be.eql(output);
  });

  it('should be able to extract url with only hostname and path', () => {
    const input = 'https://www.trendsales.dk/hello/world';
    const output = 'https://www.trendsales.dk/hello/world';

    const url = new Url(input);
    expect(url.toString()).to.be.eql(output);
  });

  it('should be able to extract url with only hostname and query', () => {
    const input = 'https://www.trendsales.dk/?foo=bar&bar=baz';
    const output = 'https://www.trendsales.dk?foo=bar&bar=baz';

    const url = new Url(input);
    expect(url.toString()).to.be.eql(output);
  });

  it('should be able to add to query', () => {
    const input = 'https://www.trendsales.dk/?foo=bar&bar=baz';
    const output = 'https://www.trendsales.dk?foo=bar&bar=baz&baz=bar';

    const url = new Url(input);
    url.query.baz = 'bar';
    expect(url.toString()).to.be.eql(output);
  });

  it('should be able to update query', () => {
    const input = 'https://www.trendsales.dk/?foo=bar&bar=baz';
    const output = 'https://www.trendsales.dk?foo=bar&bar=foo';

    const url = new Url(input);
    url.query.bar = 'foo';
    expect(url.toString()).to.be.eql(output);
  });

  it('should be able to delete from query', () => {
    const input = 'https://www.trendsales.dk/?foo=bar&bar=baz';
    const output = 'https://www.trendsales.dk?foo=bar';

    const url = new Url(input);
    delete url.query.bar;
    expect(url.toString()).to.be.eql(output);
  });
});
