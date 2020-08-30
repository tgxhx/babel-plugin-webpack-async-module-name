const babel6 = require('babel-core');
const babel7 = require('@babel/core');
const path = require('path');
const readFileSync = require('fs').readFileSync;
const expect = require('chai').expect;

function testPlugin(babel, code) {
  const result = babel.transform(code, {
    plugins: ['./lib/index.js'],
  });
  return result.code;
}

function replaceLineBreak(string) {
  return string.replace(/\r\n|\n/gi, '');
}

function readFile(filepath) {
  return readFileSync(path.join(__dirname, filepath), 'utf8');
}

describe('babel-plugin-webpack-async-module-name', () => {
  it('babel6: The transformation code should be equal to the expected code.', () => {
    const actual = readFile('babel6.actual.code');
    const expected = readFile('babel6.expected.code');
    const result = testPlugin(babel6, actual);
    expect(replaceLineBreak(result)).to.equal(replaceLineBreak(expected));
  });

  it('babel7: The transformation code should be equal to the expected code.', () => {
    const actual = readFile('babel7.actual.code');
    const expected = readFile('babel7.expected.code');
    const result = testPlugin(babel7, actual);
    expect(replaceLineBreak(result)).to.equal(replaceLineBreak(expected));
  });
});
